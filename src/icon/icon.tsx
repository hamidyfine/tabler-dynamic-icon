import './icon.style.scss';

import type { IconProps as IconPropsTabler, TablerIcon } from '@tabler/icons-react';
import { lazy, Suspense } from 'react';

import type { IconsName } from './icon.type';

interface IconProps extends Omit<IconPropsTabler, 'size'> {
    animation?: 'spin';
    cls?: string; // Icon CSS Class
    icon?: TablerIcon; // Icon Component
    name?: string | keyof typeof IconsName; // Icon Name
    size?: number;
    stroke?: number;
}

// Fallback component for loading state
const IconFallback = ({ size }: { size: number|string }) => (
    <div
        aria-hidden="true"
        style={{
            display: 'inline-block',
            height: size,
            width: size,
        }}
    />
);

export const Icon = ({
    animation,
    cls: IconCssClass,
    icon: IconComponent,
    name: IconName,
    size = 18,
    stroke = 1.5,
    ...rest_props
}: IconProps) => {
    if (!IconComponent && !IconName && !IconCssClass) {
        return null;
    }

    const icon_props = {
        size,
        stroke,
        ...rest_props,
    };

    const icon_classes = ['icon'];
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
    if (IconName && !IconComponent) {
        const LazyIcon = lazy(() =>
            import('@tabler/icons-react').then(module => ({
                default: module[IconName as keyof typeof module] as TablerIcon,
            })),
        );

        return (
            <Suspense fallback={<IconFallback size={size} />}>
                <LazyIcon
                    {...icon_props}
                    className={icon_classes.join(' ')}
                />
            </Suspense>
        );
    }

    return null;
};
