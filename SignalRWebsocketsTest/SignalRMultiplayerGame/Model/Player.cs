using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using SignalRMultiplayerGame.Model.HelperClasses;
using Newtonsoft.Json;

namespace SignalRMultiplayerGame.Model
{
    public class Player
    {
        static int count = 0;

        public string PlayerName { get; set; }
        public Vector2D  Location { get; set; }
        public Vector2D Velocity { get; set; }
        public int Direction { get; set; }
        public int Id { get; set; }

        public Player()
        {
            Id = count;
            this.Velocity = new Vector2D(0, 0);
            count++;
        }

        public void Update()
        {
            this.Location += Velocity;
        }

        //Entity.configure("Entity" ,"img", "direction", "x", "y", "width", "height", "moving", "state", "speed", "type", "clipX", "clipY", "lifetime", "reloadTime");
    }
}