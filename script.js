// const graph= require('https://cdn.jsdelivr.net/npm/chart.js');
let graph=document.querySelector('#graph_analysis').getContext('2d');

document.getElementById('calculate_button').addEventListener('click', ()=> {
    // try {
        const A = 0.1;
        const B = 1.0;
        const C = 2.0;
        const E = 0.05;
        const F = 0.7;
        const k = 2 * Math.PI / 0.056;

        const sigmaVvDb = parseFloat(document.getElementById('entry_vv').value);
        const sigmaVhDb = parseFloat(document.getElementById('entry_vh').value);
        const thetaDeg = parseFloat(document.getElementById('entry_theta').value);

        const sigmaVv = Math.pow(10.0, sigmaVvDb / 10);
        const sigmaVh = Math.pow(10.0, sigmaVhDb / 10);
        // const theta = Math.toRadians(thetaDeg);
        const theta =  thetaDeg*(Math.PI/180);
        const epsilon = 10.0; // Simplified for demonstration
        const s = 0.05; // Simplified for demonstration

        const modelSigmaVv = (A / Math.cos(theta)) * Math.pow((epsilon - 1) / (epsilon + 1), B) * Math.exp(-C * Math.cos(theta) * k * s);
        const modelSigmaVh = E * Math.pow(modelSigmaVv, 2 * F);

        const results = `
            sigma_vv (linear scale): ${sigmaVv}
            sigma_vh (linear scale): ${sigmaVh}
            Incidence angle (theta) in radians: ${theta}
            Wave number (k): ${k}
            Optimized dielectric constant (epsilon): ${epsilon}
            Optimized surface roughness (s): ${s}
            Modeled sigma_vv: ${modelSigmaVv}
            Modeled sigma_vh: ${modelSigmaVh}
        `;

        document.getElementById('result').innerText = results;


        // graph plot code
        let myChart = new Chart(graph,{
            //specifying the type of graph.
            type:'bar',
            data :{
                  datasets:[
                    {
                        label :'Measured Sigma VV',                    
                        data:[
                            {x:theta,y:sigmaVv}
                        ],
                        backgroundColor:'rgba(75,192,192,1)',
                        backgroundColor:'rgba(75,392,192,1)',
                        barThickness:50,
                        borderWidth:2,
                        pointRadius:5
                        
                    },

                    {
                        label :'Modeled Sigma VV',                    
                        data:[
                            {x:theta,y:modelSigmaVv}
                        ],
                        backgroundColor:'rgba(153,102,255,1)',
                        backgroundColor:'rgba(153,102,255,1)',
                        borderWidth:2,
                        barThickness:50,
                        pointRadius:5

                    },

                    
                    {
                        label :'Measured Sigma VH',                    
                        data:[
                            {x:theta,y:sigmaVh}
                        ],
                        backgroundColor:'rgba(255,159,64,1)',
                        backgroundColor:'rgba(255,159,64,1)',
                        borderWidth:2,
                        barThickness:50,
                        pointRadius:5

                    },


                    
                    {
                        label :'Modeled Sigma VV',                    
                        data:[
                            {x:theta,y:modelSigmaVh}
                        ],
                        backgroundColor:'rgba(255,99,132,1)',
                        backgroundColor:'rgba(255,99,132,1)',
                        borderWidth:2,
                        pointRadius:5,
                        barThickness:50
                        

                    },


                    
                  ]
            },

            options:{
                responsive:false,
                maintainAspectRatio:false,
                layout:{
                    padding:{
                        left:50,
                        right:50,
                        top:50,
                        bottom:50,
                    },
        
                    // backgroundColor:'white',
                    tootips:{
                        enabled:true,

                    },
                   
                },

                scales:{
                    x:{
                        title:{
                               display:true,
                               text:'Incidence Angle (radians)',
                             font:{
                                size:20,
                                color:'black',
                                width:5
                             }
                        },

                        ticks:{
                            font:{
                                weight:'bold'
                            },
                        },

                        rid:{
                            color:'rgba(0,0,0,0.1)'
                        }
                        
                        

                        
                    },

                    y:{
                        title:{
                               display:true,
                               text:'Sigma Values',
                               font:{
                                size:20,
                                color:'black',
                                width:5
                             }
                        },
                        ticks:{
                            font:{
                                weight:'bold'
                            },
                        },
                        type:'logarithmic'
                    }

                    
                },
                plugins:{

                    legend:{
                        display:true,
                        position:"bottom",
                        align:'center',
                        boxWidth:20,
                        labels:{
                            fontSize:20
                        },
                     
                    }
                }
            }
        })
      
    // } catch (e) {
    //     document.getElementById('result').innerText = `An error occurred: ${e.message}`;
    // }
});
// document.querySelector('#graph_analysis').style.backgroundColor='#ffffff';

document.getElementById('exit_button').addEventListener('click', function() {
    window.close();
});