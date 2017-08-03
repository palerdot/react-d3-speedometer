import React from 'react';
import { storiesOf, action, setAddon } from '@kadira/storybook';
import infoAddon, { setDefaults } from '@storybook/addon-info';

// addon-info
setDefaults({
    inline: true,
    maxPropsIntoLine: 1,
    maxPropObjectKeys: 10,
    maxPropArrayLength: 10,
    maxPropStringLength: 100,
});

// set the info addon for storybook!
setAddon( infoAddon );

import ReactSpeedometer from '../index';
// NOTE: switch to dist for checking production version
// import ReactSpeedometer from '../../dist/index';

storiesOf('React d3 Speedometer', module)
    // default view with no configuration
    .add('Default with no config', () => (
        <ReactSpeedometer />
    ))
    // configuring values
    .addWithInfo(
        'Configuring values', 
        () => (
            <ReactSpeedometer
                maxValue={500}
                value={473}
                needleColor="red"
                startColor="green"
                segments={10}
                endColor="blue"
            />
        ),
        { source: true, inline: true, header: false }
    )
    // fluid display view
    .addWithInfo(
        'Fluid Width view', 
        () => (
            <div style={{
                width: "500px",
                height: "300px",
                background: "#EFEFEF"
            }}>
                <ReactSpeedometer
                    fluidWidth={true}
                    minValue={100}
                    maxValue={500}
                    value={473}
                    needleColor="steelblue"
                />
            </div>
        ),
        { source: true, inline: true, header: false }
    )
    // needle transition duration
    .addWithInfo(
        'Needle Transition Duration',
        () => (
            <ReactSpeedometer
                value={333}
                needleColor="steelblue"
                needleTransitionDuration={4000}
                needleTransition="easeElastic"
            />
        ),
        { source: true, inline: true, header: false }
    );

