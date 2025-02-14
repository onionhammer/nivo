import React from 'react'
import { LegendSvgItem } from '@nivo/legends'
import { Highlight } from '../../Highlight'
import { useTheme } from '../../../theming/context'

const shapes = ['square', 'circle', 'triangle', 'diamond'] as const

const code = `
const CustomSymbolShape = ({
    x, y, size, fill, borderWidth, borderColor
}) => (
    <rect
        x={x}
        y={y}
        transform={\`rotate(45 \${size/2} \${size/2})\`}
        fill={fill}
        strokeWidth={borderWidth}
        stroke={borderColor}
        width={size}
        height={size}
        style={{ pointerEvents: 'none' }}
    />
)
`.trim()

export const SymbolShape = () => {
    const theme = useTheme()

    const itemsProps = {
        x: 0,
        y: 0,
        width: 160,
        height: 40,
        data: {
            id: 'demo',
            color: theme.colors.accent,
        },
    }

    return (
        <div>
            <h2>Symbol shape</h2>
            <p>
                You can customize symbols using <code>symbolShape</code> property.
            </p>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                }}
            >
                {shapes.map(shape => (
                    <div
                        key={shape}
                        style={{
                            background: theme.colors.cardBackground,
                            padding: '10px 15px',
                            borderRadius: 2,
                            display: 'flex',
                            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                        }}
                    >
                        <svg width={itemsProps.width} height={itemsProps.height}>
                            <LegendSvgItem
                                {...itemsProps}
                                textColor={theme.colors.text}
                                data={{
                                    ...itemsProps.data,
                                    label: shape,
                                }}
                                direction="left-to-right"
                                symbolShape={shape}
                            />
                        </svg>
                    </div>
                ))}
            </div>
            <p>
                You can also use a custom shape passing a component to <code>symbolShape</code>:
            </p>
            <Highlight code={code} language="jsx" />
        </div>
    )
}
