import React from 'react'
import {
    ResponsiveTreeMapCanvas,
    TreeMapCanvasDefaultProps,
    TreeMapDefaultProps,
} from '@nivo/treemap'
import { ComponentTemplate } from '../../components/components/ComponentTemplate'
import meta from '../../data/components/treemap/meta.yml'
import mapper from '../../data/components/treemap/mapper'
import { groups } from '../../data/components/treemap/props'
import { generateHeavyDataSet } from '../../data/components/treemap/generator'
import { graphql, useStaticQuery } from 'gatsby'

const initialProperties = {
    identity: TreeMapCanvasDefaultProps.identity,
    value: TreeMapCanvasDefaultProps.value,
    valueFormat: { format: '.02s', enabled: true },
    tile: TreeMapCanvasDefaultProps.tile,
    leavesOnly: true,
    innerPadding: 0,
    outerPadding: 0,

    margin: {
        top: 10,
        right: 10,
        bottom: 10,
        left: 10,
    },

    pixelRatio:
        typeof window !== 'undefined' && window.devicePixelRatio ? window.devicePixelRatio : 1,

    enableLabel: true,
    label: TreeMapDefaultProps.label,
    labelSkipSize: 18,
    labelTextColor: {
        from: 'color',
        modifiers: [['darker', 3]],
    },
    orientLabel: TreeMapCanvasDefaultProps.orientLabel,

    colors: { scheme: 'spectral' },
    colorBy: 'id',
    nodeOpacity: TreeMapCanvasDefaultProps.nodeOpacity,
    borderWidth: TreeMapCanvasDefaultProps.borderWidth,
    borderColor: {
        from: 'color',
        modifiers: [['darker', 0.8]],
    },

    animate: TreeMapDefaultProps.animate,
    motionConfig: TreeMapDefaultProps.motionConfig,

    isInteractive: TreeMapDefaultProps.isInteractive,
}

const TreeMapCanvas = () => {
    const {
        image: {
            childImageSharp: { gatsbyImageData: image },
        },
    } = useStaticQuery(graphql`
        query {
            image: file(absolutePath: { glob: "**/src/assets/captures/treemap-canvas.png" }) {
                childImageSharp {
                    gatsbyImageData(layout: FIXED, width: 700, quality: 100)
                }
            }
        }
    `)

    return (
        <ComponentTemplate
            name="TreeMapCanvas"
            meta={meta.TreeMapCanvas}
            icon="treemap"
            flavors={meta.flavors}
            currentFlavor="canvas"
            properties={groups}
            initialProperties={initialProperties}
            defaultProperties={TreeMapCanvasDefaultProps}
            propertiesMapper={mapper}
            generateData={generateHeavyDataSet}
            image={image}
        >
            {(properties, data, theme, logAction) => {
                return (
                    <ResponsiveTreeMapCanvas
                        data={data.root}
                        {...properties}
                        theme={theme}
                        onClick={node => {
                            logAction({
                                type: 'click',
                                label: `[node] ${node.id}: ${node.formattedValue}`,
                                color: node.color,
                                data: node,
                            })
                        }}
                    />
                )
            }}
        </ComponentTemplate>
    )
}

export default TreeMapCanvas
