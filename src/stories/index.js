import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import ReactSpeedometer from '../index';

storiesOf('React d3 Speedometer', module)
    .add('default view', () => (
        <ReactSpeedometer
            minValue={100}
            maxValue={500}
            value={333}
            needleColor="steelblue"
        />
    ));