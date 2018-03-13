using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SignalRMultiplayerGame.Model
{
    public class Keyboard
    {
        [JsonProperty("PlayerName")]
        public string PlayerName { get; set; }
        [JsonProperty("prevW")]
        public bool PrevW { get; set; }
        [JsonProperty("prevA")]
        public bool PrevA { get; set; }
        [JsonProperty("prevS")]
        public bool PrevS { get; set; }
        [JsonProperty("prevD")]
        public bool PrevD { get; set; }
    }
}