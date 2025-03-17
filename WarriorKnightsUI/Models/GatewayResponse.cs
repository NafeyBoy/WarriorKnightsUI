namespace WarriorKnightsUI.Models
{
    public class GatewayResponse
    {
        public bool Success { get; set; }
        public int StatusCode { get; set; }
        public string Response { get; set; }
        public string Message { get; set; }
    }
}