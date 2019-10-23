(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['exports', 'echarts'], factory);
    } else if (typeof exports === 'object' && typeof exports.nodeName !== 'string') {
        // CommonJS
        factory(exports, require('echarts'));
    } else {
        // Browser globals
        factory({}, root.echarts);
    }
}(this, function (exports, echarts) {
    var log = function (msg) {
        if (typeof console !== 'undefined') {
            console && console.error && console.error(msg);
        }
    };
    if (!echarts) {
        log('ECharts is not Loaded');
        return;
    }
    echarts.registerTheme('shine', {
        "color": [
            "#8ec3a7",
            "#dc5356",
            "#f0cb69",
            "#5fb7e5",
            "#ab91c5"
        ],
        "backgroundColor": "#ffffff",
        "textStyle": {},
        "title": {
            "textStyle": {
                "color": "#454545"
            },
            "subtextStyle": {
                "color": "#7d7d7d"
            },
        },
        "line": {
            "itemStyle": {
                "normal": {
                    "borderWidth": "1"
                }
            },
            "lineStyle": {
                "normal": {
                    "width": "2"
                }
            },
            "symbolSize": "6",
            "symbol": "circle",
            "smooth": true
        },
        "radar": {
            "itemStyle": {
                "normal": {
                    "borderWidth": "1"
                }
            },
            "lineStyle": {
                "normal": {
                    "width": "2"
                }
            },
            "symbolSize": "6",
            "symbol": "circle",
            "smooth": true
        },
        "bar": {
            "itemStyle": {
                "normal": {
                    "barBorderWidth": "0",
                    "barBorderColor": "#f0f0f0"
                },
                "emphasis": {
                    "barBorderWidth": "0",
                    "barBorderColor": "#f0f0f0"
                }
            }
        },
        "pie": {
            "itemStyle": {
                "normal": {
                    "borderWidth": "0",
                    "borderColor": "#f0f0f0"
                },
                "emphasis": {
                    "borderWidth": "0",
                    "borderColor": "#f0f0f0"
                }
            }
        },
        "scatter": {
            "itemStyle": {
                "normal": {
                    "borderWidth": "0",
                    "borderColor": "#f0f0f0"
                },
                "emphasis": {
                    "borderWidth": "0",
                    "borderColor": "#f0f0f0"
                }
            }
        },
        "boxplot": {
            "itemStyle": {
                "normal": {
                    "borderWidth": "0",
                    "borderColor": "#f0f0f0"
                },
                "emphasis": {
                    "borderWidth": "0",
                    "borderColor": "#f0f0f0"
                }
            }
        },
        "parallel": {
            "itemStyle": {
                "normal": {
                    "borderWidth": "0",
                    "borderColor": "#f0f0f0"
                },
                "emphasis": {
                    "borderWidth": "0",
                    "borderColor": "#f0f0f0"
                }
            }
        },
        "sankey": {
            "itemStyle": {
                "normal": {
                    "borderWidth": "0",
                    "borderColor": "#f0f0f0"
                },
                "emphasis": {
                    "borderWidth": "0",
                    "borderColor": "#f0f0f0"
                }
            }
        },
        "funnel": {
            "itemStyle": {
                "normal": {
                    "borderWidth": "0",
                    "borderColor": "#f0f0f0"
                },
                "emphasis": {
                    "borderWidth": "0",
                    "borderColor": "#f0f0f0"
                }
            }
        },
        "gauge": {
            "itemStyle": {
                "normal": {
                    "borderWidth": "0",
                    "borderColor": "#f0f0f0"
                },
                "emphasis": {
                    "borderWidth": "0",
                    "borderColor": "#f0f0f0"
                }
            }
        },
        "candlestick": {
            "itemStyle": {
                "normal": {
                    "color": "#8ec3a7",
                    "color0": "transparent",
                    "borderColor": "#8ec3a7",
                    "borderColor0": "#dc5356",
                    "borderWidth": "2"
                }
            }
        },
        "graph": {
            "itemStyle": {
                "normal": {
                    "borderWidth": "0",
                    "borderColor": "#f0f0f0"
                }
            },
            "lineStyle": {
                "normal": {
                    "width": "0.7",
                    "color": "#c9c9c9"
                }
            },
            "symbolSize": "6",
            "symbol": "circle",
            "smooth": true,
            "color": [
                "#8ec3a7",
                "#dc5356",
                "#f0cb69",
                "#5fb7e5",
                "#ab91c5"
            ],
            "label": {
                "normal": {
                    "textStyle": {
                        "color": "#fafafa"
                    }
                }
            }
        },
        "map": {
            "itemStyle": {
                "normal": {
                    "areaColor": "#d4d4d4",
                    "borderColor": "#ebebeb",
                    "borderWidth": "0.4"
                },
                "emphasis": {
                    "areaColor": "#dc5356",
                    "borderColor": "#ffffff",
                    "borderWidth": "1"
                }
            },
            "label": {
                "normal": {
                    "textStyle": {
                        "color": "#ffffff"
                    }
                },
                "emphasis": {
                    "textStyle": {
                        "color": "rgb(255,255,255)"
                    }
                }
            }
        },
        "geo": {
            "itemStyle": {
                "normal": {
                    "areaColor": "#d4d4d4",
                    "borderColor": "#ebebeb",
                    "borderWidth": "0.4"
                },
                "emphasis": {
                    "areaColor": "#dc5356",
                    "borderColor": "#ffffff",
                    "borderWidth": "1"
                }
            },
            "label": {
                "normal": {
                    "textStyle": {
                        "color": "#ffffff"
                    }
                },
                "emphasis": {
                    "textStyle": {
                        "color": "rgb(255,255,255)"
                    }
                }
            }
        },
        "categoryAxis": {
            "axisLine": {
                "show": true,
                "lineStyle": {
                    "color": "#cccccc"
                }
            },
            "axisTick": {
                "show": false,
                "lineStyle": {
                    "color": "#333"
                }
            },
            "axisLabel": {
                "show": true,
                "textStyle": {
                    "color": "#000000"
                }
            },
            "splitLine": {
                "show": false,
                "lineStyle": {
                    "color": [
                        "#eeeeee",
                        "#333333"
                    ]
                }
            },
            "splitArea": {
                "show": true,
                "areaStyle": {
                    "color": [
                        "rgba(250,250,250,0.05)",
                        "rgba(179,179,179,0)"
                    ]
                }
            }
        },
        "valueAxis": {
            "axisLine": {
                "show": true,
                "lineStyle": {
                    "color": "#cccccc"
                }
            },
            "axisTick": {
                "show": false,
                "lineStyle": {
                    "color": "#333"
                }
            },
            "axisLabel": {
                "show": true,
                "textStyle": {
                    "color": "#000000"
                }
            },
            "splitLine": {
                "show": false,
                "lineStyle": {
                    "color": [
                        "#eeeeee",
                        "#333333"
                    ]
                }
            },
            "splitArea": {
                "show": true,
                "areaStyle": {
                    "color": [
                        "rgba(250,250,250,0.05)",
                        "rgba(179,179,179,0)"
                    ]
                }
            }
        },
        "logAxis": {
            "axisLine": {
                "show": true,
                "lineStyle": {
                    "color": "#cccccc"
                }
            },
            "axisTick": {
                "show": false,
                "lineStyle": {
                    "color": "#333"
                }
            },
            "axisLabel": {
                "show": true,
                "textStyle": {
                    "color": "#8a8a8a"
                }
            },
            "splitLine": {
                "show": false,
                "lineStyle": {
                    "color": [
                        "#eeeeee",
                        "#333333"
                    ]
                }
            },
            "splitArea": {
                "show": true,
                "areaStyle": {
                    "color": [
                        "rgba(250,250,250,0.05)",
                        "rgba(179,179,179,0)"
                    ]
                }
            }
        },
        "timeAxis": {
            "axisLine": {
                "show": true,
                "lineStyle": {
                    "color": "#cccccc"
                }
            },
            "axisTick": {
                "show": false,
                "lineStyle": {
                    "color": "#333"
                }
            },
            "axisLabel": {
                "show": true,
                "textStyle": {
                    "color": "#8a8a8a"
                }
            },
            "splitLine": {
                "show": false,
                "lineStyle": {
                    "color": [
                        "#eeeeee",
                        "#333333"
                    ]
                }
            },
            "splitArea": {
                "show": true,
                "areaStyle": {
                    "color": [
                        "rgba(250,250,250,0.05)",
                        "rgba(179,179,179,0)"
                    ]
                }
            }
        },
        "toolbox": {
            "iconStyle": {
                "normal": {
                    "borderColor": "#999999"
                },
                "emphasis": {
                    "borderColor": "#666666"
                }
            }
        },
        "legend": {
            "textStyle": {
                "color": "#000000"
            },
        },
        "tooltip": {
            "axisPointer": {
                "lineStyle": {
                    "color": "#7e87cf",
                    "width": "1"
                },
                "crossStyle": {
                    "color": "#7e87cf",
                    "width": "1"
                }
            }
        },
        "timeline": {
            "lineStyle": {
                "color": "#cfcfcf",
                "width": 1
            },
            "itemStyle": {
                "normal": {
                    "color": "#8fd3e8",
                    "borderWidth": 1
                },
                "emphasis": {
                    "color": "#c9c9c9"
                }
            },
            "controlStyle": {
                "normal": {
                    "color": "#8fd3e8",
                    "borderColor": "#8fd3e8",
                    "borderWidth": 0.5
                },
                "emphasis": {
                    "color": "#8fd3e8",
                    "borderColor": "#8fd3e8",
                    "borderWidth": 0.5
                }
            },
            "checkpointStyle": {
                "color": "#d9d9d9",
                "borderColor": "rgba(138,124,168,0.37)"
            },
            "label": {
                "normal": {
                    "textStyle": {
                        "color": "#8fd3e8"
                    }
                },
                "emphasis": {
                    "textStyle": {
                        "color": "#8fd3e8"
                    }
                }
            }
        },
        "visualMap": {
            "color": [
				"#2B637B",
                "#5FA49F",
                "#89B3AE",
            ]
        },
        "dataZoom": {
            "backgroundColor": "rgba(0,0,0,0)",
            "dataBackgroundColor": "rgba(255,255,255,0.3)",
            "fillerColor": "rgba(204,204,204,0.4)",
            "handleColor": "#c9c9c9",
            "handleSize": "1%",
            "textStyle": {
                "color": "#333333"
            }
        },
        "markPoint": {
            "label": {
                "normal": {
                    "textStyle": {
                        "color": "#fafafa"
                    }
                },
                "emphasis": {
                    "textStyle": {
                        "color": "#fafafa"
                    }
                }
            }
        }
    });
}));
