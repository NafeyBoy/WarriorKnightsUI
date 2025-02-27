namespace WarriorKnightsUI.Models
{
    public class PlayerMessageResponseVM
    {
        public Guid PlayerMessageId { get; set; }
        public Guid GameId { get; set; }
        public Dictionary<string, object> ResponseValues { get; set; }
            
        public PlayerMessageResponseVM()
        {
            ResponseValues = new Dictionary<string, object>();
        }
    }
}