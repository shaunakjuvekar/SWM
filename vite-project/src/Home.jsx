import "./Home.css";
import sarin from "./assets/subhash-sarin.jpg";
import shaun from "./assets/shaunak.jpeg";
import akshat from "./assets/Akshat.jpeg";
import garbage_truck_1 from "./assets/garbage-truck-1.jpg"
import garbage_truck_2 from "./assets/garbage-truck-2.jpg"
import garbage_bin from "./assets/garbage-bin.jpg"
import garbage_toy from "./assets/garbage-toy.jpg"

function Home(){

    const imgStyles = {
        height: 300, 
        width:500, 
        border: '10x solid black', 
        borderRadius: 15,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 8
    }

   

    return (

        <div className="home-container">
            <div className="about-section">
            <h2 className = 'heading-style'>About SWEEP</h2>
            
            <div className="img-container">
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
                
            </div>

            <hr style={{height: 3, backgroundColor: 'black', marginTop: 20, marginBottom: 20}}></hr>
            <p>    
            <b>SWEEP</b> (Solid Waste Echelon Embedded Planner) is a web-based application for designing a Municipal Solid Waste (MSW) 
            management system. Through SWEEP, a user can choose locations for each node in an <b>echelon</b>, input the land and 
            size configuration cost of facility/container, and generate a MSW management system based on the input values. 
            The resulting MSW management system is obtained by solving a “Multi-Echelon Location Routing problem” 
            using <b>Gurobi</b>, which yields the optimal configuration of the MSW management system.
            
            </p>
            <br></br>
            <p>
            The structure of a MSW management system includes multiple <b>echelons</b> that represent different levels of 
            waste collection in an area. The first echelon is dedicated to the sources of waste, which represents 
            households, offices, hospitals, restaurants, or other entities that generate waste. The second echelon 
            includes the possible locations where the <b>containers</b> can be placed that store the waste collected from 
            sources of waste through <b>collection agents</b> such as trucks, tractors, among others. The cost incurred in 
            establishing a container involves <b>land cost</b>, and <b>size configuration cost</b> which is based on the capacity of 
            the container. The locations in echelon third and onwards are labelled as facilities which represent 
            processing centers, transfer stations, or storage facilities. Similar to the second echelon, the costs 
            incurred in establishing the facilities include land cost, and size configuration cost.

            </p>
           
            <hr style={{height: 3, backgroundColor: 'black', marginTop: 20}}></hr>
        
    

            </div>
            
            <h2 style={{paddingTop: 20, paddingBottom: 15}}>Meet The Team</h2>

            <div className="row">
                <div className="column">
                    <h3 className="profile-team">
                        Dr. Subhash Sarin 
                    </h3>
                   
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
                    <h3 className="profile-team">
                        Akshat Kothyari 
                    </h3>
                    
                    <img src={akshat} alt='profile image' style={{height: 300, width: 300, padding: 10, borderRadius: 30}}></img>
                    <p>  
                    Akshat is a PhD student in Industrial and Systems engineering department, with specialization in Operations Research. 
                    His research interests lie in vehicle routing problems, facility location, scheduling and other 
                    logistics-based combinatorial problems. Apart from research, he is actively involved in football 
                    and in music as keyboard/piano player. 
                       
                    </p>
                    <p className="contact">Contact : kakshat@vt.edu</p>
                </div>
                <div className="column">
                    <h3 className="profile-team">
                        Shaunak Juvekar 
                    </h3>
                     
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