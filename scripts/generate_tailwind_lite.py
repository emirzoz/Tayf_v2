
import json
import pathlib
import re
from typing import Optional

TOKENS_PATH = pathlib.Path('tailwind_tokens.json')
OUTPUT_PATH = pathlib.Path('styles/tailwind-lite.css')
OUTPUT_PATH.parent.mkdir(parents=True, exist_ok=True)

color_map = {
    'prussian_blue': '#062b46',
    'timberwolf': '#d7d3d3',
    'yinmn_blue': '#3b5b82',
    'blue_gray': '#6e92b6',
    'emerald-400': '#34d399',
    'sky-300': '#7dd3fc',
    'white': '#ffffff',
    'black': '#000000',
    'transparent': 'transparent',
}


def transparent_variant(color: str) -> str:
    if color == 'transparent':
        return 'rgba(0,0,0,0)'
    if color.startswith('#'):
        return hex_to_rgba(color, 0)
    if color.startswith('rgba'):
        parts = color[5:-1].split(',')
        rgb = ','.join(parts[:3])
        return f'rgba({rgb}, 0)'
    if color.startswith('rgb'):
        parts = color[4:-1]
        return f'rgb({parts}, 0)'
    return 'rgba(0,0,0,0)'


def hex_to_rgba(value: str, alpha: float) -> str:
    value = value.lstrip('#')
    if len(value) == 3:
        value = ''.join(ch * 2 for ch in value)
    r = int(value[0:2], 16)
    g = int(value[2:4], 16)
    b = int(value[4:6], 16)
    return f'rgba({r}, {g}, {b}, {alpha:.3f})'


spacing_scale = {
    '0': '0rem',
    '0.5': '0.125rem',
    '1': '0.25rem',
    '1.5': '0.375rem',
    '2': '0.5rem',
    '2.5': '0.625rem',
    '3': '0.75rem',
    '3.5': '0.875rem',
    '4': '1rem',
    '5': '1.25rem',
    '6': '1.5rem',
    '7': '1.75rem',
    '8': '2rem',
    '9': '2.25rem',
    '10': '2.5rem',
    '12': '3rem',
    '14': '3.5rem',
    '16': '4rem',
    '20': '5rem',
    '24': '6rem',
    '28': '7rem',
    '32': '8rem',
    '36': '9rem',
    '40': '10rem',
    '48': '12rem',
    '64': '16rem',
}


font_sizes = {
    'xs': ('0.75rem', '1rem'),
    'sm': ('0.875rem', '1.25rem'),
    'base': ('1rem', '1.5rem'),
    'lg': ('1.125rem', '1.75rem'),
    'xl': ('1.25rem', '1.75rem'),
    '2xl': ('1.5rem', '2rem'),
    '3xl': ('1.875rem', '2.25rem'),
    '4xl': ('2.25rem', '2.5rem'),
    '5xl': ('3rem', '1'),
    '6xl': ('3.75rem', '1'),
}


breakpoints = {
    'sm': '640px',
    'md': '768px',
    'lg': '1024px',
    'xl': '1280px',
}


simple_rules = {
    'flex': 'display:flex;',
    'inline-flex': 'display:inline-flex;',
    'flex-col': 'flex-direction:column;',
    'flex-row': 'flex-direction:row;',
    'flex-wrap': 'flex-wrap:wrap;',
    'flex-1': 'flex:1 1 0%;',
    'flex-grow': 'flex-grow:1;',
    'flex-shrink-0': 'flex-shrink:0;',
    'grid': 'display:grid;',
    'hidden': 'display:none;',
    'block': 'display:block;',
    'inline-block': 'display:inline-block;',
    'w-full': 'width:100%;',
    'w-auto': 'width:auto;',
    'h-full': 'height:100%;',
    'h-auto': 'height:auto;',
    'min-h-screen': 'min-height:100vh;',
    'min-h-0': 'min-height:0;',
    'rounded': 'border-radius:0.25rem;',
    'rounded-sm': 'border-radius:0.125rem;',
    'rounded-md': 'border-radius:0.375rem;',
    'rounded-lg': 'border-radius:0.5rem;',
    'rounded-xl': 'border-radius:0.75rem;',
    'rounded-2xl': 'border-radius:1rem;',
    'rounded-full': 'border-radius:9999px;',
    'uppercase': 'text-transform:uppercase;',
    'text-center': 'text-align:center;',
    'text-left': 'text-align:left;',
    'font-bold': 'font-weight:700;',
    'font-semibold': 'font-weight:600;',
    'font-heading': "font-family:'Exo 2','sans-serif';",
    'font-sans': "font-family:'Open Sans','sans-serif';",
    'items-center': 'align-items:center;',
    'items-start': 'align-items:flex-start;',
    'items-end': 'align-items:flex-end;',
    'items-stretch': 'align-items:stretch;',
    'justify-between': 'justify-content:space-between;',
    'justify-center': 'justify-content:center;',
    'justify-end': 'justify-content:flex-end;',
    'self-start': 'align-self:flex-start;',
    'self-end': 'align-self:flex-end;',
    'mx-auto': 'margin-left:auto;margin-right:auto;',
    'ml-auto': 'margin-left:auto;',
    'mt-auto': 'margin-top:auto;',
    'pointer-events-none': 'pointer-events:none;',
    'pointer-events-auto': 'pointer-events:auto;',
    'overflow-hidden': 'overflow:hidden;',
    'overflow-y-auto': 'overflow-y:auto;',
    'relative': 'position:relative;',
    'absolute': 'position:absolute;',
    'fixed': 'position:fixed;',
    'inset-0': 'inset:0;',
    'inset-y-0': 'top:0;bottom:0;',
    'top-0': 'top:0;',
    'right-6': 'right:1.5rem;',
    'z-10': 'z-index:10;',
    'z-50': 'z-index:50;',
    'z-[55]': 'z-index:55;',
    'z-[60]': 'z-index:60;',
    'w-1/2': 'width:50%;',
    'w-3/4': 'width:75%;',
    'w-5/6': 'width:83.333333%;',
    'w-1.5': 'width:0.375rem;',
    'h-1.5': 'height:0.375rem;',
    'w-1.5': 'width:0.375rem;',
    'h-px': 'height:1px;',
    'shadow': 'box-shadow:0 1px 2px rgba(0,0,0,0.1);',
    'shadow-md': 'box-shadow:0 4px 6px rgba(0,0,0,0.1);',
    'shadow-lg': 'box-shadow:0 10px 15px rgba(0,0,0,0.15);',
    'shadow-xl': 'box-shadow:0 20px 25px rgba(0,0,0,0.18);',
    'shadow-2xl': 'box-shadow:0 25px 50px rgba(0,0,0,0.25);',
    'drop-shadow': 'filter:drop-shadow(0 10px 8px rgba(0,0,0,0.15));',
    'backdrop-blur': 'backdrop-filter:blur(12px);',
    'transition': 'transition:all 0.2s ease-in-out;',
    'transition-opacity': 'transition:opacity 0.3s ease;',
    'transition-transform': 'transition:transform 0.3s ease;',
    'duration-300': '',
    'ease-out': '',
    'tracking-wider': 'letter-spacing:0.05em;',
    'tracking-[0.18em]': 'letter-spacing:0.18em;',
    'leading-tight': 'line-height:1.25;',
    'leading-relaxed': 'line-height:1.625;',
    'aspect-video': 'aspect-ratio:16/9;',
    'tabular-nums': 'font-variant-numeric:tabular-nums;',
    'bg-transparent': 'background-color:transparent;',
    'border-b-2': 'border-bottom-width:2px;border-style:solid;',
    'list-disc': 'list-style-type:disc;',
    'place-items-center': 'place-items:center;',
    'object-cover': 'object-fit:cover;',
    'object-contain': 'object-fit:contain;',
    'inset-x-0': 'left:0;right:0;',
    'outline-none': 'outline:none;',
    'ring-2': 'box-shadow:0 0 0 2px var(--tw-ring-color, rgba(59,91,130,0.45));',
    'ring-[#6E92B6]': '--tw-ring-color: rgba(110,146,182,0.8);',
}


opacity_map = {
    '0': 0,
    '5': 0.05,
    '10': 0.1,
    '20': 0.2,
    '25': 0.25,
    '30': 0.3,
    '40': 0.4,
    '50': 0.5,
    '60': 0.6,
    '70': 0.7,
    '75': 0.75,
    '80': 0.8,
    '90': 0.9,
    '95': 0.95,
    '100': 1,
}


def escape_class(token: str) -> str:
    def esc(ch: str) -> str:
        if re.match(r'[a-zA-Z0-9_-]', ch):
            return ch
        return '\\' + ch
    return ''.join(esc(ch) for ch in token)


def spacing_value(key: str) -> Optional[str]:
    if key.startswith('[') and key.endswith(']'):
        inner = key[1:-1]
        return inner
    if '/' in key:
        try:
            num, denom = key.split('/')
            return f'{float(num) / float(denom) * 100}%'
        except Exception:
            return None
    if key.endswith('px'):
        return key
    return spacing_scale.get(key)


def color_value(name: str) -> Optional[str]:
    if name.startswith('['):
        inner = name[1:]
        alpha_part = None
        if ']/' in inner:
            color_hex, alpha_part = inner.split(']/', 1)
        elif inner.endswith(']'):
            color_hex = inner[:-1]
        else:
            color_hex = inner
        if alpha_part and alpha_part.replace('.', '', 1).isdigit():
            return hex_to_rgba(color_hex, float(alpha_part) / 100)
        return color_hex.rstrip(']')
    if '/' in name:
        base, alpha_part = name.split('/', 1)
        base_color = color_map.get(base) or (base if base.startswith('#') else None)
        if base_color and alpha_part.isdigit():
            return hex_to_rgba(base_color, int(alpha_part) / 100)
    base = color_map.get(name)
    if base:
        return base
    if name.startswith('#'):
        return name
    return None


def gradient_direction(token: str) -> Optional[str]:
    if not token.startswith('bg-gradient-to-'):
        return None
    key = token.replace('bg-gradient-to-', '')
    mapping = {
        't': 'to top',
        'b': 'to bottom',
        'l': 'to left',
        'r': 'to right',
        'tl': 'to top left',
        'tr': 'to top right',
        'bl': 'to bottom left',
        'br': 'to bottom right',
    }
    return mapping.get(key, 'to right')


def handle_spacing(token: str) -> Optional[str]:
    match = re.match(r'(-?)([mp])([trblxy]?)-(-?[0-9./]+|\[.+?\]|auto)', token)
    if not match:
        return None
    sign, prop_group, axis = match.group(1), match.group(2), match.group(3)
    raw = match.group(4)
    negative = raw.startswith('-') or sign == '-'
    value_key = raw[1:] if raw.startswith('-') else raw
    if value_key == 'auto':
        value = 'auto'
    else:
        value = spacing_value(value_key)
    if value is None:
        return None
    if negative:
        if value.endswith('%') or value.endswith('rem') or value.endswith('px'):
            value = f'-{value}'
    if prop_group == 'm':
        base = 'margin'
    else:
        base = 'padding'
    def apply(parts):
        return ';'.join(f'{base}-{part}:{value}' for part in parts)
    if axis == '':
        return f'{base}:{value};'
    if axis == 'x':
        return apply(['left', 'right']) + ';'
    if axis == 'y':
        return apply(['top', 'bottom']) + ';'
    mapping = {'t': 'top', 'r': 'right', 'b': 'bottom', 'l': 'left'}
    part = mapping.get(axis)
    if part:
        return f'{base}-{part}:{value};'
    return None


def handle_gap(token: str) -> Optional[str]:
    match = re.match(r'gap-([0-9.]+)', token)
    if match:
        value = spacing_value(match.group(1))
        if value:
            return f'gap:{value};'
    if token.startswith('space-y-'):
        value = spacing_value(token.replace('space-y-', ''))
        if value:
            selector = escape_class(token)
            return f'.{selector} > :not([hidden]) ~ :not([hidden])' \
                   f'{{margin-top:{value};}}'
    return None


def handle_size(token: str) -> Optional[str]:
    if token.startswith('w-') and token not in simple_rules:
        key = token[2:]
        frac_map = {'1/2': '50%', '1/3': '33.333333%', '2/3': '66.666667%', '1/4': '25%', '3/4': '75%', '1/5': '20%',
                    '2/5': '40%', '3/5': '60%', '4/5': '80%', '1/6': '16.666667%', '5/6': '83.333333%'}
        if key in frac_map:
            return f'width:{frac_map[key]};'
        value = spacing_value(key)
        if value:
            return f'width:{value};'
    if token.startswith('h-') and token not in simple_rules:
        key = token[2:]
        value = spacing_value(key)
        if value:
            return f'height:{value};'
    if token.startswith('max-w-'):
        key = token.replace('max-w-', '')
        preset = {
            'sm': '24rem',
            'md': '28rem',
            'lg': '32rem',
            'xl': '36rem',
            '2xl': '42rem',
            '3xl': '48rem',
            '4xl': '56rem',
            '5xl': '64rem',
            '6xl': '72rem',
            '7xl': '80rem',
        }
        if key.startswith('[') and key.endswith(']'):
            return f'max-width:{key[1:-1]};'
        value = preset.get(key)
        if value:
            return f'max-width:{value};'
    if token.startswith('min-h-') and token not in simple_rules:
        key = token.replace('min-h-', '')
        if key == 'screen':
            return 'min-height:100vh;'
        value = spacing_value(key)
        if value:
            return f'min-height:{value};'
    return None


def handle_text(token: str) -> Optional[str]:
    if token.startswith('text-'):
        key = token.replace('text-', '')
        if key in font_sizes:
            size, line = font_sizes[key]
            return f'font-size:{size};line-height:{line};'
        color = color_value(key)
        if color:
            return f'color:{color};'
    return None


def handle_bg(token: str) -> Optional[str]:
    if token.startswith('bg-') and not token.startswith('bg-gradient'):
        key = token.replace('bg-', '')
        color = color_value(key)
        if color:
            return f'background-color:{color};'
    return None


def handle_border(token: str) -> Optional[str]:
    if token == 'border':
        return 'border-width:1px;border-style:solid;'
    if token == 'border-2':
        return 'border-width:2px;border-style:solid;'
    if token in {'border-b', 'border-t', 'border-l'}:
        sides = {
            'border-b': 'border-bottom-width',
            'border-t': 'border-top-width',
            'border-l': 'border-left-width',
        }
        return f"{sides[token]}:1px;border-style:solid;"
    if token.startswith('border-'):
        key = token.replace('border-', '')
        color = color_value(key)
        if color:
            return f'border-color:{color};'
    return None


def handle_shadow(token: str) -> Optional[str]:
    if token.startswith('shadow') and token in simple_rules:
        return simple_rules[token]
    if token.startswith('shadow-') and token not in simple_rules:
        if token == 'shadow-[#6E92B6]/30':
            return 'box-shadow:0 20px 35px rgba(110,146,182,0.3);'
    return None


def handle_grid(token: str) -> Optional[str]:
    if token.startswith('grid-cols-'):
        count = token.replace('grid-cols-', '')
        if count.isdigit():
            return f'grid-template-columns:repeat({int(count)}, minmax(0, 1fr));'
    if token.startswith('col-span-'):
        count = token.replace('col-span-', '')
        if count.isdigit():
            return f'grid-column:span {count} / span {count};'
    return None


def handle_opacity(token: str) -> Optional[str]:
    match = re.match(r'opacity-([0-9]+)', token)
    if match:
        value = opacity_map.get(match.group(1))
        if value is not None:
            return f'opacity:{value};'
    return None


def handle_position(token: str) -> Optional[str]:
    if token.startswith('-translate-y-'):
        value = spacing_value(token.replace('-translate-y-', ''))
        if value:
            return f'transform:translateY(-{value});'
    if token.startswith('translate-x-'):
        value = spacing_value(token.replace('translate-x-', ''))
        if value:
            return f'transform:translateX({value});'
    if token == 'translate-x-full':
        return 'transform:translateX(100%);'
    return None


def handle_misc(token: str) -> Optional[str]:
    if token == 'container':
        return 'width:100%;max-width:80rem;margin-left:auto;margin-right:auto;padding-left:1rem;padding-right:1rem;'
    if token == 'backdrop-blur-sm':
        return 'backdrop-filter:blur(4px);'
    if token == 'text-timberwolf/70':
        return f"color:{hex_to_rgba('#d7d3d3', 0.7)};"
    return None


def handle_font(token: str) -> Optional[str]:
    if token.startswith('tracking-') and token not in simple_rules:
        value = token.replace('tracking-', '')
        if value.startswith('[') and value.endswith(']'):
            return f'letter-spacing:{value[1:-1]};'
    return None


def base_rule(token: str) -> Optional[str]:
    for handler in (
        simple_rules.get,
        handle_spacing,
        handle_gap,
        handle_size,
        handle_text,
        handle_bg,
        handle_border,
        handle_grid,
        handle_shadow,
        handle_opacity,
        handle_position,
        handle_font,
        handle_misc,
    ):
        if handler == simple_rules.get:
            rule = handler(token)
        else:
            rule = handler(token)
        if rule:
            return rule
    direction = gradient_direction(token)
    if direction:
        return (
            f'--tw-gradient-direction:{direction};'
            'background-image:linear-gradient(var(--tw-gradient-direction),'
            'var(--tw-gradient-from), var(--tw-gradient-to, transparent));'
        )
    if token.startswith('from-'):
        color = color_value(token.replace('from-', ''))
        if color:
            transparent = transparent_variant(color)
            return (
                f'--tw-gradient-from:{color};'
                f'--tw-gradient-to:{transparent};'
                '--tw-gradient-stops:var(--tw-gradient-from), var(--tw-gradient-to);'
            )
    if token.startswith('to-'):
        color = color_value(token.replace('to-', ''))
        if color:
            return f'--tw-gradient-to:{color};'
    if token.startswith('via-'):
        color = color_value(token.replace('via-', ''))
        if color:
            return (
                '--tw-gradient-stops:var(--tw-gradient-from), '
                f'{color}, var(--tw-gradient-to, {color});'
            )
    return None


def parse_prefixes(token: str):
    responsive = None
    pseudo = None
    base = token
    while ':' in base:
        prefix, rest = base.split(':', 1)
        if prefix in breakpoints:
            responsive = prefix
            base = rest
            continue
        if prefix == 'hover':
            pseudo = ':hover'
            base = rest
            continue
        if prefix == 'focus':
            pseudo = ':focus'
            base = rest
            continue
        break
    return responsive, pseudo, base


def build_rule(token: str) -> Optional[str]:
    responsive, pseudo, base = parse_prefixes(token)
    rule = base_rule(base)
    if not rule:
        return None
    selector = f'.{escape_class(token)}'
    if pseudo:
        selector += pseudo
    block = f'{selector}{{{rule}}}'
    if responsive:
        width = breakpoints[responsive]
        block = f'@media (min-width: {width}){{{block}}}'
    return block


def main():
    tokens = json.loads(TOKENS_PATH.read_text())
    rules = []
    missing = []
    for token in tokens:
        css = build_rule(token)
        if css:
            rules.append(css)
        else:
            missing.append(token)
    OUTPUT_PATH.write_text('\n'.join(rules) + '\n')
    if missing:
        print('Missing tokens:', ', '.join(missing))


if __name__ == '__main__':
    main()
