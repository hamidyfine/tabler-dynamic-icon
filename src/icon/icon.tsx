import './icon.style.scss';

import type { IconProps as IconPropsTabler } from '@tabler/icons-react';

import type { IconsCls } from './icon.classes';
import type { IconsName } from './icon.enums';
import { useIconsRegistry } from './icon.hooks';

interface IconProps extends Omit<IconPropsTabler, 'size'> {
    animation?: 'spin';
    cls?: IconsCls; // Icon CSS Class
    icon?: any; // Icon Component
    name?: keyof typeof IconsName; // Icon Name
    size?: number;
    stroke?: number;
}

export const Icon = ({
    animation,
    cls: IconCssClass,
    icon: IconComponent,
    name: IconName,
    size = 18,
    stroke = 1.5,
    ...rest_props
}: IconProps) => {
    const { icons } = useIconsRegistry();

    if (!IconComponent && !IconName && !IconCssClass) {
        return null;
    }

    const icon_props = {
        size,
        stroke,
        ...rest_props,
    };

    const icon_classes = ['icon', rest_props.className];
    if (animation) icon_classes.push(`icon__animate--${animation}`);

    // If IconCssClass is Provided
    if (IconCssClass) {
        return (
            <div
                className="icon__box"
                style={{
                    height: size,
                    width: size,
                }}
            >
                <i
                    className={`ti ti-${IconCssClass} ${icon_classes.join(' ')}`}
                    style={{ fontSize: size }}
                />
            </div>
        );
    }

    // If IconComponent is Provided
    if (IconComponent) {
        return (
            <IconComponent
                {...icon_props}
                className={icon_classes.join(' ')}
            />
        );
    }

    // If IconName is provided
    if (IconName && !icons) {
        console.warn(`Icon "${IconName}" cannot be rendered: No IconsProvider found. Please wrap your component with IconsProvider or use the 'icon' or 'cls' prop instead.`);
        return null;
    }

    if (IconName && icons) {
        const SelectedIcon = icons?.[IconName];

        if (!SelectedIcon) {
            console.warn(`Icon "${IconName}" not found in IconSet.`);
            return null;
        }
        return (
            <SelectedIcon
                {...icon_props}
                className={icon_classes.join(' ')}
            />
        );
    }

    return null;
};
