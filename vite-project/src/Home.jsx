import "./Home.css";
import sarin from "./assets/subhash-sarin-3.jpg";
import shaun from "./assets/shaunak.jpeg";
import akshat from "./assets/Akshat.jpeg";
import garbage_truck_1 from "./assets/garbage-truck-1.jpg"
import garbage_truck_2 from "./assets/garbage-truck-2.jpg"
import garbage_bin from "./assets/garbage-bin.jpg"
import garbage_toy from "./assets/garbage-toy.jpg"
import { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
// import ExampleCarouselImage from 'components/ExampleCarouselImage';

function Home(){

    const imgStyles = {
        height: 500, 
        width:750, 
        border: '10x solid black', 
        borderRadius: 15,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 8
    }

   
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
    };
    

    return (

        <div className="home-container">
            <div className="about-section">
            <h2 className = 'heading-style'>About SWEEP</h2>
            
            <Carousel>
          <Carousel.Item>
            <img style={imgStyles} src={garbage_truck_1} alt="First slide" />
          </Carousel.Item>
          <Carousel.Item>
            <img style={imgStyles} src={garbage_truck_2} alt="Second slide" />
          </Carousel.Item>
          <Carousel.Item>
            <img style={imgStyles} src={garbage_bin} alt="Third slide" />
          </Carousel.Item>
          <Carousel.Item>
            <img style={imgStyles} src={garbage_toy} alt="Fourth slide" />
          </Carousel.Item>
        </Carousel>
            {/* <div className="img-container">
                <span>
                <img src={garbage_truck_1} alt='garbage-truck-1' 
                style={imgStyles}></img>
                <img src={garbage_bin} alt='garbage-bin' 
                style={imgStyles}></img>
                 <img src={garbage_toy} alt='garbage-toy' 
                style={imgStyles}></img>
                  <img src={garbage_truck_2} alt='garbage-truck-2' 
                style={imgStyles}></img>

                </span>
                
            </div> */}

            <hr style={{height: 1, backgroundColor: 'black', marginTop: 20, marginBottom: 20}}></hr>
            <p>    

            <b>SWEEP</b> (Solid Waste Echelon-Embedded Planner) is a web-based tool for designing a Municipal Solid Waste (MSW) 
            management system. Given potential locations, sizes, and relevant costs for facilities in each <b>echelon</b>, and 
            capacities of vehicles (collection agents such as trucks, tractors, among others), it enables the user to choose 
            the <b>number</b>, <b>sizes</b>, and <b>locations</b> of requisite facilities in each echelon, as well as the number of vehicles and 
            their routes to use for transporting waste among echelons, thereby generating an <b>execution plan</b>. This plan is 
            obtained by solving an underlying “<b>Multi-Echelon Location Routing problem</b>” using an optimal seeking method. 
            
            </p>
            <br></br>
            <p>

            The structure of a MSW management system includes multiple <b>echelons</b> that represent different levels
            of waste collection/processing in an area. The first echelon is dedicated to the sources of waste, 
            which represent households, offices, hospitals, restaurants, or other entities that generate waste. 
            The second echelon includes possible locations for the placement of <b>containers</b> to store the waste collected 
            from their sources by vehicles. The cost incurred in establishing a container involves <b>land cost</b>, and <b>size 
            configuration cost</b>,  which is based on container capacity. The locations in the third and higher echelons 
            are labelled as <b>facilities</b>, which represent processing centers, transfer stations, or storage areas. Similar 
            to the second echelon, the costs incurred in establishing these facilities include land cost and size 
            configuration cost.


            </p>
           
            <hr style={{height: 1, backgroundColor: 'black', marginTop: 20}}></hr>

            </div>
            
            <h2 style={{paddingTop: 20, paddingBottom: 15}}>Meet The Team</h2>

            <div className="row">
                <div className="column">
                    <h4 className="profile-team">
                        Dr. Subhash Sarin 
                    </h4>
                   
                        <img src={sarin} alt='profile image' 
                        style={{height: 300, width: 300, padding: 10, borderRadius: 30}}>

                        </img>
                    
                    <p>      
                        Dr. Sarin is the  Paul T. Norton Endowed Professor in the Grado Department of Industrial and Systems Engineering. 
                        He works in the area of production planning, scheduling, logistics, and applied mathematical programming.
                    </p>
                    <p className="contact">Contact : sarins@vt.edu</p>   
                </div>
                
                <div className="column">
                    <h4 className="profile-team">
                        Akshat Kothyari 
                    </h4>
                    
                    <img src={akshat} alt='profile image' style={{height: 300, width: 300, padding: 10, borderRadius: 30}}></img>
                    <p>  
                    Akshat is a PhD student in the Industrial and Systems Engineering department, with specialization in Operations Research. 
                    His research interests lie in vehicle routing problems, facility location, scheduling and other 
                    logistics-based combinatorial problems. Apart from research, he is actively involved in football 
                    and in music as keyboard/piano player. 
                       
                    </p>
                    <p className="contact">Contact : kakshat@vt.edu</p>
                </div>
                <div className="column">
                    <h4 className="profile-team">
                        Shaunak Juvekar 
                    </h4>
                     
                    <img src={shaun} alt='profile image' style={{height: 300, width: 300, padding: 10, borderRadius: 30}}></img>
                    <p>
                    Shaunak is a Computer Science master's student at Virginia Tech, graduating class of 2024.  
                    His interests lie in application development, networks and distributed systems. Beyond his passion 
                    for computer science, Shaunak plays table tennis competitively and also loves improvising on the piano in his spare time. 
                    </p>
                    <p className="contact">Contact : jshaunak@vt.edu</p>
                </div>
               

            </div>
                

        </div>
        
        
    )
}

export default Home;