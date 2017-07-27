// React port of - http://bl.ocks.org/msqr/3202712
import React from "react";
import PropTypes from 'prop-types';

// selectively import d3 components for reducing file size
// import * as d3 from "d3";
import { 
    format as d3Format , 
    scaleLinear as d3ScaleLinear,
    range as d3Range,
    arc as d3Arc,
    select as d3Select,
    line as d3Line,
    curveMonotoneX as d3CurveMonotoneX,
    pie as d3Pie,
    rgb as d3Rgb,
    interpolateHsl as d3InterpolateHsl,
    easeElastic as d3EaseElastic 
} from "d3";

class ReactSpeedometer extends React.Component {

    static displayName = 'ReactSpeedometer';

    constructor(props) {
        
        super(props);

        // list of d3 refs to share within the components
        this._d3_refs = {
            powerGauge: false
        };

        // the initial value is 0;
        // on subsequent renders we will update the initial value with previous value for animating
        this.initialValue = 0;
    };

    componentWillMount() {

    };

    componentDidMount() {
        // render the gauge here
        this.renderGauge();
    };

    render = () => {
        return (
            <div ref={ref => this.gaugeDiv = ref}>
            </div>
        );
        // Porumai! Arun react d3 speedo component {this.props.value}
    };

    componentWillReceiveProps() {
        // update the initial value
        this.initialValue = this.props.value || 0;
    }

    shouldComponentUpdate (new_props) {
        return true;
        // NOTE: following logic for 'stopRerender'
        // update the props
        this.props = new_props;
        // just update our readings
        this.updateReadings();
        // DO NOT UPDATE THE WHOLE COMPONENT
        return false;
    }

    componentWillUpdate() {

    }

    componentDidUpdate() {
        // on update; just update the readings; rendering already done
        this.updateReadings();
    }

    getGauge () {

        var self = this; // save reference

        var PROPS = this.props;

        // main gauge function;
        // takes a container inside which we will display the speedometer
        // here container is our gaugeDiv ref
        return function (container) {

            var default_config = {
                // size: 300,
                width: 300,
                height: 300,
                ringInset: 20,
                ringWidth: 60,

                pointerWidth: 10,
                pointerTailLength: 5,
                pointerHeadLengthPercent: 0.9,

                minAngle: -90,
                maxAngle: 90,

                transitionMs: 4000,
                
                labelFormat: d3Format('d'),
                labelInset: 10,

                // calculate the ReactSpeedometer 'parentNode' width/height; it might be used if fluidWidth: true
                parentWidth: self.gaugeDiv.parentNode.clientWidth,
                parentHeight: self.gaugeDiv.parentNode.clientHeight
            };

            // START: Configurable values
            var config = {
                // width/height config
                // if fluidWidth; width/height taken from the parent of the ReactSpeedometer
                // else if width/height given it is used; else our default
                width: PROPS.fluidWidth ? default_config.parentWidth : ( PROPS.width || default_config.width ),
                height: PROPS.fluidWidth ? default_config.parentHeight : ( PROPS.height || default_config.height ),
                // min/max values
                minValue: PROPS.minValue || 0,
                maxValue: PROPS.maxValue || 1000,
                // color of the speedometer needle
                needleColor: PROPS.needleColor || "steelblue",
                // sections in the speedometer
                majorTicks: PROPS.sections || 5,
                // color range for the sections
                arcColorFn: d3InterpolateHsl( 
                                d3Rgb( PROPS.startColor || '#FF471A' ), 
                                d3Rgb( PROPS.endColor || '#33CC33') 
                            )
                // arcColorFn: d3.interpolateHsl( 
                //                 d3.rgb( PROPS.startColor || '#FF471A' ), 
                //                 d3.rgb( PROPS.endColor || '#33CC33') 
                //             ),

            };
            // END: Configurable values

            // merge default config with the config
            config = Object.assign( {}, default_config, config );

            var range = undefined,
                r = undefined,
                pointerHeadLength = undefined,
                value = 0,

                svg = undefined,
                arc = undefined,
                scale = undefined,

                ticks = undefined,
                tickData = undefined;

            // var donut = d3.pie();
            var donut = d3Pie();

            function deg2rad(deg) {
                return deg * Math.PI / 180;
            }

            function newAngle(d) {
                var ratio = scale(d);
                var newAngle = config.minAngle + (ratio * range);

                return newAngle;
            }

            function configure () {

                // merge the config with incoming (optional) configuration
                // config = Object.assign( {}, config, configuration );

                range = config.maxAngle - config.minAngle;
                // r = config.size / 2;
                r = config.width / 2;
                pointerHeadLength = Math.round(r * config.pointerHeadLengthPercent);

                // a linear scale that maps domain values to a percent from 0..1
                // scale = d3.scaleLinear()
                scale = d3ScaleLinear()
                            .range([0, 1])
                            .domain([config.minValue, config.maxValue]);

                ticks = scale.ticks(config.majorTicks);
                // tickData = d3.range(config.majorTicks)
                tickData = d3Range(config.majorTicks)
                                .map(function() {
                                    return 1 / config.majorTicks;
                                });

                // arc = d3.svg.arc()
                // arc = d3.arc()
                arc = d3Arc()
                        .innerRadius(r - config.ringWidth - config.ringInset)
                        .outerRadius(r - config.ringInset)
                        .startAngle(function(d, i) {
                            var ratio = d * i;
                            return deg2rad(config.minAngle + (ratio * range));
                        })
                        .endAngle(function(d, i) {
                            var ratio = d * (i + 1);
                            return deg2rad(config.minAngle + (ratio * range));
                        });
            }

            function centerTranslation() {
                return 'translate(' + r + ',' + r + ')';
            }

            function isRendered() {
                return (svg !== undefined);
            }

            function render (newValue) {

                // svg = d3.select(container)
                svg = d3Select( container )
                        .append('svg:svg')
                        .attr('class', 'gauge')
                        .attr('width', config.width)
                        .attr('height', config.height);

                var centerTx = centerTranslation();

                var arcs = svg.append('g')
                                .attr('class', 'arc')
                                .attr('transform', centerTx);

                arcs.selectAll('path')
                        .data(tickData)
                            .enter().append('path')
                        .attr('fill', function(d, i) {
                            return config.arcColorFn(d * i);
                        })
                        .attr('d', arc);

                var lg = svg.append('g')
                            .attr('class', 'label')
                            .attr('transform', centerTx);

                lg.selectAll('text')
                    .data(ticks)
                        .enter().append('text')
                    .attr('transform', function(d) {
                        var ratio = scale(d);
                        var newAngle = config.minAngle + (ratio * range);
                        return 'rotate(' + newAngle + ') translate(0,' + (config.labelInset - r) + ')';
                    })
                    .text(config.labelFormat)
                    // styling stuffs
                    .style("text-anchor", "middle")
                    .style("font-size", "14px")
                    .style("font-weight", "bold")
                    .style("fill", "#666");

                // save current value reference
                self._d3_refs.current_value_text = svg.append("g")
                    .attr("transform","translate(" + config.width/2 + "," + (config.width/2) * 1.11 + ")")
                    .append("text")
                    .attr("text-anchor", "middle")
                    .text( config.currentValue || "" )
                    .style("font-size", "16px")
                    .style("font-weight", "bold")
                    .style("fill", "#666");


                var lineData = [
                    [config.pointerWidth / 2, 0],
                    [0, -pointerHeadLength],
                    [-(config.pointerWidth / 2), 0],
                    [0, config.pointerTailLength],
                    [config.pointerWidth / 2, 0]
                ];

                // var pointerLine = d3.svg.line().interpolate('monotone');
                // var pointerLine = d3.line()
                var pointerLine = d3Line()
                                    // .curve( d3.curveMonotoneX );
                                    .curve( d3CurveMonotoneX );
                
                var pg = svg.append('g').data([lineData])
                            .attr('class', 'pointer')
                            .attr('transform', centerTx)
                            .style("fill", config.needleColor)
                            // .style("stroke", "green");

                self._d3_refs.pointer = pg.append('path')
                                            .attr('d', pointerLine )
                                            .attr('transform', 'rotate(' + config.minAngle + ')');

                update(newValue === undefined ? 0 : newValue);
            }



            function update (newValue) {

                var ratio = scale(newValue);

                var newAngle = config.minAngle + (ratio * range);
                // update the pointer
                self._d3_refs.pointer.transition()
                    .duration(config.transitionMs)
                    // .ease( d3.easeElastic )
                    .ease( d3EaseElastic )
                    .attr('transform', 'rotate(' + newAngle + ')');
                // update the current value
                self._d3_refs.current_value_text.text( config.labelFormat( newValue ) );
            }


            // configure for first time !?
            configure();

            // return a object with all our functions
            return {
                configure: configure,
                isRendered: isRendered,
                render: render,
                update: update
            };
        };
    }

    renderGauge () {
        console.log("rendering gauge ");
        // before rendering remove the existing gauge?
        // d3.select( this.gaugeDiv )
        d3Select( this.gaugeDiv )
            .select("svg")
            .remove();
        // store the gauge in our d3_refs
        this._d3_refs.powerGauge = this.getGauge()( this.gaugeDiv );
        // render for first time; no value means initializes with 0
        this._d3_refs.powerGauge.render( this.initialValue );
        // update readings for the first time
        this.updateReadings();
    };

    updateReadings () {
        // updates the readings of the gauge with the current prop value
        // animates between old prop value and current prop value
        this._d3_refs.powerGauge.update( this.props.value || 0 );
    }

};

// define the proptypes
ReactSpeedometer.propTypes = {
    value: PropTypes.number,
    minValue: PropTypes.number,
    maxValue: PropTypes.number,

    width: PropTypes.number,
    height: PropTypes.number,
    fluidWidth: PropTypes.bool,

    // segments to show in the speedometer
    segments: PropTypes.number,

    // color strings
    needleColor: PropTypes.string,
    startColor: PropTypes.string,
    endColor: PropTypes.string,
};

export default ReactSpeedometer;