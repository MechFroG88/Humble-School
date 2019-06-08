<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Classes extends HS_Controller{


    /**
     * Create a class
     * 
     * @return
     */
    public function create()
    {
	      if ($this->auth->is_logged_in()){
	      	$data = $this->input->post();
	        $response = $this->class->create($data);
          if ($response == 200){
              $this->json("Added Succesfully.",$response);
          } else {
              $this->error($response);
          }
		}
	}
	
    /**
     * Get class
     * 
     */
	public function get()
	{
		  if ($this->auth->is_logged_in()){
		  	$data = $this->input->post();
		  	$this->json($this->class->get());
		  } else {
		  	$this->error(401);
		  }
    }

    /**
     * Get single class
     * 
     */
	public function get_single($class_id)
	{
		if ($this->auth->is_logged_in()){
			$this->json($this->class->get_single($class_id));
		} else {
			$this->error(401);
		}
    }

    /**
     * Update a class
     * 
     * @return
     */
    public function update($class_id)
    {
		if ($this->auth->is_logged_in()){
			$data = $this->input->post();
			$this->json("Updated Succesfully", $this->class->update($class_id,$data));
		} else {
			$this->error(401);
		}
    }
    
    /**
     * Delete class
     * 
     * @param int $class_id
     * @return void
     */
    public function delete($class_id)
    {
		if ($this->auth->is_logged_in()){
            $response = $this->class->delete($class_id);
            if ($response == 200){
                $this->json("Deleted Succesfully.",$response);
            } else {
                $this->error($response);
            }
		} else {
			$this->error(401);
		}
	}
}