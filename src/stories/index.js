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
setAddon( infoAddon );

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
        return(
            <div>
                <h4>
                    Click the below button to force rerendering the whole component on props change. 
                    By default, on props change, only the speedometer value/needle value will be updated and animated for smooth visualization. 
                    Below button will toggle between two sets of totally different appearances, when forceRender option is given true.
                </h4>

                <button onClick={ () => {
                    // change the toggle status
                    this.setState({
                        toggleStatus: !this.state.toggleStatus
                    });
                    // now set the new set of values
                    let new_values = this.state.toggleStatus ? this.values[0] : this.values[1];
                    this.setState( new_values );
                } }>
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
        withInfo({ source: false, text: 'Usage: &lt;ReactSpeedometer forceRender={true} /&gt;', inline: true, header: false })( () => {
            return (
                <SpeedoButton />
            )
        } )
    );

