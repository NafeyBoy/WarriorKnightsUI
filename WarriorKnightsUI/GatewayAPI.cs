namespace WarriorKnightsUI
{
    public class Gateway
    {
        public static HttpClient Api = new()
        {
            BaseAddress = new Uri("http://localhost:5263/api/")
        };
    }
}