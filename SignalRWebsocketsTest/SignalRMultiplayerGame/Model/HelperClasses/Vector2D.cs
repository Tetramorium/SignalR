using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SignalRMultiplayerGame.Model.HelperClasses
{
    public class Vector2D
    {
        public int X { get; set; }
        public int Y { get; set; }

        public Vector2D(int _X, int _Y)
        {
            this.X = _X;
            this.Y = _Y;
        }

        public static Vector2D operator +(Vector2D value1, Vector2D value2)
        {
            return new Vector2D(value1.X + value2.X, value1.Y + value2.Y);
        }
    }
}