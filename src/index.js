// React port of - http://bl.ocks.org/msqr/3202712
import React from "react";

// TODO: selectively import d3 components
import * as d3 from "d3";

class ReactSpeedometer extends React.Component {

    constructor(props) {
        super(props);

        // list of d3 refs to share within the components
        this._d3_refs = {
            powerGauge: false
        };

        console.log("porumai constructor ", props, d3, d3.layout);
    };

    componentWillMount() {
        console.log("porumai componentWillMount ");
    };

    componentDidMount() {
        console.log("porumai componentDidMount ");
        // render the gauge here
        this.renderGauge();
    };

    render = () => {
        console.log("porumai! rendering ", this.props);
        return (
            <div ref={ref => this.gaugeDiv = ref}>
            </div>
        );
        // Porumai! Arun react d3 speedo component {this.props.value}
    };

    componentWillReceiveProps() {
        console.log("porumai componentWillReceiveProps ", this.props);
    }

    shouldComponentUpdate (new_props) {

        console.log("Porumai! shouldComponentUpdate ", this.props, new_props, arguments);
        // update the props
        this.props = new_props;
        // just update our readings
        this.updateReadings();
        // DO NOT UPDATE THE WHOLE COMPONENT
        return false;
    }

    componentWillUpdate() {
        console.log("porumai componentWillUpdate");
    }

    componentDidUpdate() {
        console.log("porumai componentDidUpdate");
    }

    // ---------------------------------------------------------------------
    // d3 gauge specific code; wild play; might may want to remove in future
    // ---------------------------------------------------------------------

    getGauge () {

        var self = this; // save reference

        var PROPS = this.props;

        var gauge = function (container) {

            var config = {
                size: 300,
                clipWidth: 300,
                clipHeight: 300,
                ringInset: 20,
                ringWidth: 60,

                pointerWidth: 10,
                pointerTailLength: 5,
                pointerHeadLengthPercent: 0.9,

                minAngle: -90,
                maxAngle: 90,

                transitionMs: 4000,
                
                labelFormat: d3.format('d'),
                labelInset: 10,

                // START: Configurable values
                // min/max values
                minValue: PROPS.minValue || 0,
                maxValue: PROPS.maxValue || 1000,
                // color of the speedometer needle
                needleColor: PROPS.needleColor || "yellow",
                // sections in the speedometer
                majorTicks: PROPS.sections || 5,
                // color range for the sections
                arcColorFn: d3.interpolateHsl( d3.rgb( PROPS.startColor || '#FF471A' ), d3.rgb( PROPS.endColor || '#33CC33') ),
                // END: Configurable values
            };

            var range = undefined,
                r = undefined,
                pointerHeadLength = undefined,
                value = 0,

                svg = undefined,
                arc = undefined,
                scale = undefined,

                ticks = undefined,
                tickData = undefined;

            var donut = d3.pie();

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
                r = config.size / 2;
                pointerHeadLength = Math.round(r * config.pointerHeadLengthPercent);

                // a linear scale that maps domain values to a percent from 0..1
                scale = d3.scaleLinear()
                            .range([0, 1])
                            .domain([config.minValue, config.maxValue]);

                ticks = scale.ticks(config.majorTicks);
                tickData = d3.range(config.majorTicks).map(function() {
                    return 1 / config.majorTicks;
                });

                // arc = d3.svg.arc()
                arc = d3.arc()
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
                console.log("center translation ? ", r, arguments);
                return 'translate(' + r + ',' + r + ')';
            }

            function isRendered() {
                return (svg !== undefined);
            }

            function render (newValue) {

                svg = d3.select(container)
                        .append('svg:svg')
                        .attr('class', 'gauge')
                        .attr('width', config.clipWidth)
                        .attr('height', config.clipHeight);

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
                    .attr("transform","translate(" + config.clipWidth/2 + "," + config.clipHeight/1.77 + ")")
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
                var pointerLine = d3.line().curve( d3.curveMonotoneX );
                
                var pg = svg.append('g').data([lineData])
                            .attr('class', 'pointer')
                            .attr('transform', centerTx)
                            .style("fill", config.needleColor)
                            .style("stroke", "green");

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
                    .ease( d3.easeElastic )
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

        return gauge;
    }

    renderGauge () {
        // store the gauge in our d3_refs
        this._d3_refs.powerGauge = this.getGauge()( this.gaugeDiv );
        // render for first time; no value means initializes with 0
        this._d3_refs.powerGauge.render();
        // update readings for the first time
        this.updateReadings();
    };

    updateReadings () {
        // updates the readings of the gauge with the current prop value
        // animates between old prop value and current prop value
        this._d3_refs.powerGauge.update( this.props.value );
    }

};

export default ReactSpeedometer;