using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WarriorKnightsUI.Lookups;

namespace WarriorKnightsUI.Models
{
    public class GatewayRequest
    {
        public string Url { get; set; }
        public GatewayRequestType? HttpType { get; set; }
        public object Body { get; set; }
    }
}