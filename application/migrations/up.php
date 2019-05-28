<?php
require_once "MysqliDb.php";
require_once "hoff.php";

class Upstream
{
    function __construct()
    {
        $this->db = new Hoff(new MysqliDb('localhost', 'root', 'root', 'school'));
        $this->table = new MysqliDb('localhost', 'root', 'root', 'school');
    }

    public function users()
    {

        $this->db->column("user_id")     ->bigint(20)  ->primary()->unique()->autoIncrement()
                 ->column("username")    ->varchar(20) ->index()
                 ->column("password")    ->char(60)
                 ->column("token")       ->char(60)    ->index()
                 ->create("users");

        $this->table->insertMulti("users", [
                    [ "username" => "admin" , 
                    "password" => password_hash('admin', PASSWORD_DEFAULT) ,
                    "token" => 0,]
                ]);

        return $this;
    }

}

$up = new Upstream();
$up->users();
