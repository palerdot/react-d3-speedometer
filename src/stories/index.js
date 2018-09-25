import React, { Component } from 'react';
// import { storiesOf, action, setAddon } from '@kadira/storybook';
import { storiesOf, action, setAddon } from '@storybook/react';
import infoAddon, { setDefaults, withInfo } from '@storybook/addon-info';
// knobs for showing dynamic props
import { withKnobs, text, boolean, number } from '@storybook/addon-knobs';

// addon-info
setDefaults({
    inline: true,
    maxPropsIntoLine: 1,
    maxPropObjectKeys: 10,
    maxPropArrayLength: 10,
    maxPropStringLength: 100,
});

// set the info addon for storybook!
setAddon(infoAddon);

import ReactSpeedometer from '../index';
// NOTE: switch to dist for checking production version
// import ReactSpeedometer from '../../dist/index';

// a custom button with state to demonstrate force rendering
class SpeedoButton extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            toggleStatus: false,
            value: 111,
            startColor: 'blue',
            segments: 5,
            width: 300,
            height: 300
        };

        this.values = [
            {
                value: 111,
                startColor: 'blue',
                segments: 5,
                width: 300,
                height: 300
            },
            {
                value: 222,
                startColor: 'orange',
                segments: 10,
                width: 400,
                height: 400
            }
        ];
    };

    render() {
        return (
            <div>
                <h4>
                    Click the below button to force rerendering the whole component on props change.
                    By default, on props change, only the speedometer value/needle value will be updated and animated for smooth visualization.
                    Below button will toggle between two sets of totally different appearances, when forceRender option is given true.
                </h4>

                <button onClick={() => {
                    // change the toggle status
                    this.setState({
                        toggleStatus: !this.state.toggleStatus
                    });
                    // now set the new set of values
                    let new_values = this.state.toggleStatus ? this.values[0] : this.values[1];
                    this.setState(new_values);
                }}>
                    <strong>Force Re render component on props change</strong>
                </button>
                <ReactSpeedometer
                    value={this.state.value}
                    startColor={this.state.startColor}
                    forceRender={true}
                    segments={this.state.segments}
                    width={this.state.width}
                    height={this.state.height}
                />

            </div>
        )
    }
}

class SpeedoButtons extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            speedometer1: {
                startColor: 'red',
                toggleStatus: false,
                value: 10,
                maxValue: 200,
                segments: 1
            },
            speedometer2: {
                startColor: 'blue',
                toggleStatus: false,
                value: 10,
                maxValue: 40,
                segments: 1
            }
        };

        this.values = [
            {
                speedometer1: {
                    startColor: 'red',
                    toggleStatus: false,
                    value: 10,
                    maxValue: 200,
                    segments: 1
                },
                speedometer2: {
                    startColor: 'blue',
                    toggleStatus: false,
                    value: 10,
                    maxValue: 40,
                    segments: 1
                }
            },
            {
                speedometer1: {
                    startColor: 'orange',
                    toggleStatus: false,
                    value: 5,
                    maxValue: 10,
                    segments: 1
                },
                speedometer2: {
                    startColor: 'green',
                    toggleStatus: false,
                    value: 900,
                    maxValue: 1000,
                    segments: 1
                }
            }
        ]
    };

    render() {
        return (
            <div>
                <h4>
                    Click the below button to force rerendering the whole component on props change.
                    By default, on props change, only the speedometer value/needle value will be updated and animated for smooth visualization.
                    Below button will toggle between two sets of totally different appearances, when forceRender option is given true.
                </h4>

                <button onClick={() => {
                    // change the toggle status
                    this.setState({
                        toggleStatus: !this.state.toggleStatus
                    });
                    // now set the new set of values
                    let new_values = this.state.toggleStatus ? this.values[0] : this.values[1];
                    this.setState(new_values);
                }}>
                    <strong>Force Re render component on props change</strong>
                </button>
                <ReactSpeedometer
                    value={this.state.speedometer1.value}
                    maxValue={this.state.speedometer1.maxValue}
                    startColor={this.state.speedometer1.startColor}
                    forceRender={true}
                    segments={this.state.speedometer1.segments}
                    width={this.state.speedometer1.width}
                    height={this.state.speedometer1.height}
                />
                <ReactSpeedometer
                    value={this.state.speedometer2.value}
                    maxValue={this.state.speedometer2.maxValue}
                    startColor={this.state.speedometer2.startColor}
                    forceRender={true}
                    segments={this.state.speedometer2.segments}
                    width={this.state.speedometer2.width}
                    height={this.state.speedometer2.height}
                />

            </div>
        )
    }
}

storiesOf('react-d3-speedometer', module)
    // Add the `withKnobs` decorator to add knobs support to your stories.
    // You can also configure `withKnobs` as a global decorator.
    // .addDecorator(withKnobs)

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
                textColor="grey"
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
    )
    // knobs for demonstrating force render
    .add('force render the component',
        withInfo({ source: false, text: 'Usage: &lt;ReactSpeedometer forceRender={true} /&gt;', inline: true, header: false })(() => {
            return (
                <SpeedoButton />
            )
        })
    )
    // configuring format of the value
    .add('Configuring the format for values displayed',
        withInfo({
            source: true,
            text: "converting decimal to integer using 'd' identifier of 'd3 format'. For more details on formatting, please refer - https://github.com/d3/d3-format#locale_format",
            inline: true,
            header: false
        })(() => (
            <ReactSpeedometer
                maxValue={150}
                value={70.7}
                valueFormat={"d"}
            />
        ))
    )
    // custom value text
    .addWithInfo(
        'Custom Current Value Text',
        () => (
            <ReactSpeedometer
                value={333}
                needleColor="steelblue"
                needleTransitionDuration={4000}
                needleTransition="easeElastic"
                currentValueText="Current Value: ${value}"
            />
        ),
        { source: true, inline: true, header: false }
    )
    // render multiple Speedometer
    .addWithInfo(
        'Render multiple Speedometer with a single segment',
        () => (
            <div>
                <ReactSpeedometer
                    value={10}
                    maxValue={200}
                    segments={1}
                />
                <ReactSpeedometer
                    value={10}
                    maxValue={40}
                    segments={1}
                />
                <ReactSpeedometer
                    value={10}
                    maxValue={30}
                    segments={1}
                />
            </div>
        ),
        { source: true, inline: true, header: false }
    )
    // force render multiple Speedometer
    .add('force render multiple Speedometer with a single segment',
        withInfo({ source: false, text: 'Usage: &lt;ReactSpeedometer forceRender={true} /&gt;', inline: true, header: false })(() => {
            return (
                <SpeedoButtons />
            )
        })
    )
    ;

