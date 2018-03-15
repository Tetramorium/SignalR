using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SignalRMultiplayerGame.Model
{
    public class Keyboard
    {
        [JsonProperty("PlayerId")]
        public int PlayerId { get; set; }
        [JsonProperty("PlayerName")]
        public string PlayerName { get; set; }
        [JsonProperty("PrevW")]
        public bool PrevW { get; set; }
        [JsonProperty("PrevA")]
        public bool PrevA { get; set; }
        [JsonProperty("PrevS")]
        public bool PrevS { get; set; }
        [JsonProperty("PrevD")]
        public bool PrevD { get; set; }
        [JsonProperty("PrevSpacebar")]
        public bool PrevSpacebar { get; set; }
    }
}