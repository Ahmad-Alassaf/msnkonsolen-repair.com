<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class userpaid
{
    use Dispatchable, InteractsWithSockets, SerializesModels;
   public $email;
   public $contracts;
  
    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct($email,$contracts)
    {
        $this->email=$email;
        $this->contracts=$contracts;
       
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return \Illuminate\Broadcasting\Channel|array
     */
    public function broadcastOn()
    {
        return new PrivateChannel('channel-name');
    }
}
