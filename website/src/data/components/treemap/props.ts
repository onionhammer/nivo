// @ts-ignore
import { TreeMapDefaultProps } from '@nivo/treemap'
import {
    motionProperties,
    defsProperties,
    groupProperties,
    themeProperty,
} from '../../../lib/componentProperties'
import { chartDimensions, ordinalColors, isInteractive } from '../../../lib/chart-properties'
import { ChartProperty, Flavor } from '../../../types'

const allFlavors: Flavor[] = ['svg', 'html', 'canvas', 'api']

const defaults = TreeMapDefaultProps

const props: ChartProperty[] = [
    {
        key: 'data',
        group: 'Base',
        flavors: allFlavors,
        help: 'The hierarchical data object.',
        type: 'object',
        required: true,
    },
    {
        key: 'identity',
        group: 'Base',
        flavors: allFlavors,
        help: 'The key or function to use to retrieve nodes identity.',
        type: 'string | Function',
        required: false,
        defaultValue: defaults.identity,
    },
    {
        key: 'value',
        group: 'Base',
        flavors: allFlavors,
        help: 'The key or function to use to retrieve nodes value.',
        type: 'string | Function',
        required: false,
        defaultValue: 'value',
    },
    {
        key: 'valueFormat',
        help: `
            Value format supporting d3-format notation, this formatted value
            will then be used for labels and tooltips.
        `,
        flavors: allFlavors,
        type: 'string | Function',
        required: false,
        control: { type: 'valueFormat' },
        group: 'Base',
    },
    {
        key: 'tile',
        group: 'Base',
        flavors: allFlavors,
        help: 'Strategy used to compute nodes.',
        description: `
            Strategy used to compute nodes, see
            [official d3 documentation](https://github.com/mbostock/d3/wiki/Treemap-Layout#mode).
        `,
        type: 'string',
        required: false,
        defaultValue: 'squarify',
        control: {
            type: 'choices',
            choices: [
                { label: 'binary', value: 'binary' },
                { label: 'squarify', value: 'squarify' },
                { label: 'slice', value: 'slice' },
                { label: 'dice', value: 'dice' },
                { label: 'sliceDice', value: 'sliceDice' },
                {
                    label: 'resquarify',
                    value: 'resquarify',
                },
            ],
        },
    },
    {
        key: 'leavesOnly',
        help: 'Only render leaf nodes (no parent).',
        flavors: allFlavors,
        type: 'boolean',
        required: false,
        defaultValue: defaults.leavesOnly,
        control: { type: 'switch' },
        group: 'Base',
    },
    {
        key: 'innerPadding',
        help: 'Padding between parent and child node.',
        flavors: allFlavors,
        type: 'number',
        required: false,
        defaultValue: defaults.innerPadding,
        group: 'Base',
        control: {
            type: 'range',
            unit: 'px',
            min: 0,
            max: 32,
        },
    },
    {
        key: 'outerPadding',
        help: 'Padding between parent and child node.',
        flavors: allFlavors,
        type: 'number',
        required: false,
        defaultValue: defaults.outerPadding,
        group: 'Base',
        control: {
            type: 'range',
            unit: 'px',
            min: 0,
            max: 32,
        },
    },
    ...chartDimensions(allFlavors),
    themeProperty(allFlavors),
    ordinalColors({
        flavors: allFlavors,
        defaultValue: defaults.colors,
    }),
    {
        key: 'nodeOpacity',
        help: 'Node opacity (0~1).',
        flavors: allFlavors,
        required: false,
        defaultValue: defaults.nodeOpacity,
        type: 'number',
        control: { type: 'opacity' },
        group: 'Style',
    },
    {
        key: 'borderWidth',
        help: 'Control node border width.',
        flavors: allFlavors,
        type: 'number',
        required: false,
        defaultValue: defaults.borderWidth,
        control: { type: 'lineWidth' },
        group: 'Style',
    },
    {
        key: 'borderColor',
        help: 'Method to compute border color.',
        flavors: allFlavors,
        type: 'string | object | Function',
        required: false,
        defaultValue: defaults.borderColor,
        control: { type: 'inheritedColor' },
        group: 'Style',
    },
    ...defsProperties('Style', ['svg']),
    {
        key: 'enableLabel',
        help: 'Enable/disable labels.',
        flavors: allFlavors,
        type: 'boolean',
        required: false,
        defaultValue: defaults.enableLabel,
        control: { type: 'switch' },
        group: 'Labels',
    },
    {
        key: 'label',
        help: 'Label accessor.',
        flavors: allFlavors,
        description:
            'Defines how to get label text, can be a string (used to access current node property) or a function which will receive the actual node and must return the desired label.',
        type: 'string | Function',
        required: false,
        group: 'Labels',
        control: {
            type: 'choices',
            choices: [
                'formattedValue',
                'id',
                `node => \`\${node.id} (\${node.formattedValue})\``,
            ].map(prop => ({
                label: prop,
                value: prop,
            })),
        },
    },
    {
        key: 'labelSkipSize',
        help: 'Skip label rendering if node minimal side length is lower than given value, 0 to disable.',
        flavors: allFlavors,
        type: 'number',
        required: false,
        group: 'Labels',
        control: {
            type: 'range',
            unit: 'px',
            min: 0,
            max: 100,
        },
    },
    {
        key: 'orientLabel',
        help: 'Orient labels according to max node width/height.',
        flavors: allFlavors,
        type: 'boolean',
        required: false,
        defaultValue: defaults.orientLabel,
        control: { type: 'switch' },
        group: 'Labels',
    },
    {
        key: 'labelTextColor',
        help: 'Method to compute label text color.',
        flavors: allFlavors,
        type: 'string | object | Function',
        required: false,
        control: { type: 'inheritedColor' },
        group: 'Labels',
    },
    {
        key: 'enableParentLabel',
        flavors: ['svg', 'html', 'api'],
        help: 'Enable/disable labels.',
        type: 'boolean',
        required: false,
        defaultValue: defaults.enableParentLabel,
        control: { type: 'switch' },
        group: 'Labels',
    },
    {
        key: 'parentLabel',
        flavors: ['svg', 'html', 'api'],
        help: 'Parent label accessor.',
        description:
            'Defines how to get parent label text, can be a string (used to access current node property) or a function which will receive the actual node and must return the desired label.',
        type: 'string | Function',
        required: false,
        group: 'Labels',
        control: {
            type: 'choices',
            choices: ['id', 'formattedValue', `node => node.pathComponents.join(' / ')`].map(
                prop => ({
                    label: prop,
                    value: prop,
                })
            ),
        },
    },
    {
        key: 'parentLabelSize',
        flavors: ['svg', 'html', 'api'],
        help: `Parent label size.`,
        required: false,
        defaultValue: defaults.parentLabelSize,
        type: `number`,
        group: 'Labels',
        control: {
            type: 'range',
            min: 10,
            max: 40,
        },
    },
    {
        key: 'parentLabelPosition',
        flavors: ['svg', 'html', 'api'],
        help: 'Parent label position.',
        type: `'top' | 'right' | 'bottom' | 'left'`,
        required: false,
        group: 'Labels',
        defaultValue: defaults.parentLabelPosition,
        control: {
            type: 'choices',
            choices: ['top', 'right', 'bottom', 'left'].map(prop => ({
                label: prop,
                value: prop,
            })),
        },
    },
    {
        key: 'parentLabelPadding',
        flavors: ['svg', 'html', 'api'],
        help: `Parent label padding.`,
        required: false,
        defaultValue: defaults.parentLabelPadding,
        type: `number`,
        group: 'Labels',
        control: {
            type: 'range',
            min: 0,
            max: 20,
        },
    },
    {
        key: 'parentLabelTextColor',
        flavors: ['svg', 'html', 'api'],
        help: 'Method to compute parent label text color.',
        type: 'string | object | Function',
        required: false,
        control: { type: 'inheritedColor' },
        group: 'Labels',
    },
    isInteractive({
        flavors: ['svg', 'html', 'canvas'],
        defaultValue: defaults.isInteractive,
    }),
    {
        key: 'onMouseEnter',
        flavors: ['svg', 'html'],
        group: 'Interactivity',
        type: '(node, event) => void',
        help: 'onMouseEnter handler.',
        required: false,
    },
    {
        key: 'onMouseMove',
        flavors: ['svg', 'html', 'canvas'],
        group: 'Interactivity',
        type: '(node, event) => void',
        help: 'onMouseMove handler.',
        required: false,
    },
    {
        key: 'onMouseLeave',
        flavors: ['svg', 'html'],
        group: 'Interactivity',
        type: '(node, event) => void',
        help: 'onMouseLeave handler.',
        required: false,
    },
    {
        key: 'onClick',
        flavors: ['svg', 'html', 'canvas'],
        group: 'Interactivity',
        type: '(node, event) => void',
        help: 'onClick handler.',
        required: false,
    },
    ...motionProperties(['svg', 'html', 'canvas'], defaults, 'react-spring'),
]

export const groups = groupProperties(props)
