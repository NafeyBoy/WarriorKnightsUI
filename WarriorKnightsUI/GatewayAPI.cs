using System.Text;
using System.Text.Json;
using WarriorKnightsUI.Lookups;
using WarriorKnightsUI.Models;

namespace WarriorKnightsUI
{
    public class Gateway
    {
        public static HttpClient Api = new()
        {
            BaseAddress = new Uri("http://localhost:5263/api/")
        };
        public static async Task<GatewayResponse> Get(GatewayRequest vm)
        {
            vm.HttpType = GatewayRequestType.Get;
            return await MakeRequest(vm);
        }
        public static async Task<GatewayResponse> Post(GatewayRequest vm)
        {
            vm.HttpType = GatewayRequestType.Post;
            return await MakeRequest(vm);
        }

        public static async Task<GatewayResponse> Put(GatewayRequest vm)
        {
            vm.HttpType = GatewayRequestType.Put;
            return await MakeRequest(vm);
        }

        private static async Task<GatewayResponse> MakeRequest(GatewayRequest vm)
        {
            try
            {
                using StringContent jsonContent = new(
                    JsonSerializer.Serialize(vm.Body),
                    Encoding.UTF8,
                    "application/json");

                HttpResponseMessage response = null;
                switch (vm.HttpType)
                {
                    case GatewayRequestType.Post:
                        response = await Gateway.Api.PostAsync(vm.Url, jsonContent);
                        break;
                    case GatewayRequestType.Put:
                        response = await Gateway.Api.PutAsync(vm.Url, jsonContent);
                        break;
                    default:
                        response = await Gateway.Api.GetAsync(vm.Url);
                        break;
                }

                response.EnsureSuccessStatusCode();
                var ret = await response.Content.ReadAsStringAsync();
                return new GatewayResponse { Success = true, Response = ret };
                
            }
            catch (Exception ex)
            {
                return new GatewayResponse { Success = false, Response = ex.Message };
            }
        }
    }
}