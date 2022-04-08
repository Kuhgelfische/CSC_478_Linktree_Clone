import { useState } from 'react';


import{
    Button ,
     Form ,
     Dropdown
     

} from 'react-bootstrap'; 

import React from "react";



export default function customizeprofile(){

   const [profilename] = React.useState("");

   

   const[username] = React.useState("");


   const[Theme] = React.useState("");

  

    return( 
     
       
      <div className="container-sm mx-auto">

        <Form>
        <><Form.Group className="profile">
            

                <Form.Label>  profile name </Form.Label>
                <Form.Control
                    type="profile name"
                    name="profile name" />
            </Form.Group><Form.Group className="username">
                <Form.Label> user name </Form.Label><></>
                <Form.Control
                    type="username"
                    name="username" />


            </Form.Group><Form.Group className="theme">
                <div className="buton-group_1 d-flex p-2 ">
                <div className="p-1 ">
                <Dropdown>
            <Dropdown.Toggle>
             Select Theme 
             </Dropdown.Toggle>

            
             <Dropdown.Menu>
           
            <Dropdown.Item  ID = "light-background"  href = "#/action_1"  > Light  </Dropdown.Item>
            
            <Dropdown.Item ID = "dark_background"   href = "#/action_2"  > Dark  </Dropdown.Item>
          
        </Dropdown.Menu>
        
        
        </Dropdown>

   

        </div>
        <div className="p-1 ">
            <Dropdown>
            <Dropdown.Toggle>
             Change Font
             </Dropdown.Toggle>
             
            <Dropdown.Menu>
                <Dropdown.Item ID = " font_1" href = "#/action_1"> Calibri </Dropdown.Item>
                <Dropdown.Item ID = "font_2"  href = "#/action_2"> Helvetica </Dropdown.Item>
                <Dropdown.Item ID = "font_3"  href = "#/action_3"> Times New Roman </Dropdown.Item>
            </Dropdown.Menu>
            </Dropdown>
            </div>
            <div className="p-1 ">
            <Dropdown>
            <Dropdown.Toggle>
             Font color 
             </Dropdown.Toggle>
             
            <Dropdown.Menu>
            
                <Dropdown.Item ID = "color_1" href = "#/action_1"> Red </Dropdown.Item>
                <Dropdown.Item ID = "color_2" href = "#/action_2"> Blue </Dropdown.Item>
                <Dropdown.Item ID = "color_3" href = "#/action_3"> White </Dropdown.Item>
            </Dropdown.Menu>
            </Dropdown>
            </div> 
             </div>
      
            </Form.Group>
            

             <Button varient="primary" type="submit"> Cancel</Button><> </><Button varient="primary" type="Submit"> Submit  </Button></>
             
            </Form>
         
    
          </div>
      
               )
        
    }
   
 
    function color_change (color_name){
                 
              
        document.body.style.backgroundColor = color_name;  

     


     
}     



    