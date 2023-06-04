import "./Header.css";


function Home(){


    return (
        <div className="home-container">
            <h2>About</h2>
            
                <p>
                    <i>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </i>
                
                </p>
               
                <hr style={{height: 3, backgroundColor: 'black', marginTop: 20}}></hr>
            
                
            <h2>Meet The Team</h2>
                <h3>
                    Dr. Subhash Sarin : 
                </h3>
                <p>
                    <i>
                    Dr. Sarin is the  Paul T. Norton Endowed Professor in the Grado Department of Industrial and Systems Engineering. 
                    He works in the area of production planning, scheduling, logistics, and applied mathematical programming.
                    </i>
               
                </p>
                <h3>
                    Akshat Kothyari : 
                </h3>
                <p>
                    <i>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </i>
               
                </p>
                <h3>
                    Shaunak Juvekar : 
                </h3>
                <p><i>
                Shaunak is a Computer Science student at Virginia Tech, graduating class of 2024.  
                He works primarily in core web development stacks such as ReactJS, NodeJS, Flask, and MySQL. Beyond his passion 
                for computer science, Shaunak is an avid musician and finds solace in playing and composing on the piano. 
                </i>
                
                </p>

        </div>
    )
}

export default Home;