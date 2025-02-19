namespace WarriorKnightsUI.Models
{
    public class PlayerMessageResponseVM
    {
            public Guid PlayerMessageId { get; set; }
            public Guid GameId { get; set; }
            public object ResponseValue { get; set; }
    }
}