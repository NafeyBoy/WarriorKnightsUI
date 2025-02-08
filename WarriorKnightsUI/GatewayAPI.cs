using System.Text;
using System.Text.Json;
using Microsoft.AspNetCore.Mvc;
using WarriorKnightsUI.Models;

namespace WarriorKnightsUI
{
    public class Gateway
    {
        public static HttpClient Api = new()
        {
            BaseAddress = new Uri("http://localhost:5263/api/")
        };

        public static async Task<GatewayResponse> Post(GatewayRequest vm)
        {
            vm.HttpType = Lookups.GatewayRequestType.Post;
            return await MakeRequest(vm);
        }

        private static async Task<GatewayResponse> MakeRequest(GatewayRequest vm)
        {
            try{
                using StringContent jsonContent = new(
                    JsonSerializer.Serialize(vm.Body),
                    Encoding.UTF8,
                    "application/json");

                using HttpResponseMessage response = await Gateway.Api.PostAsync(vm.Url, jsonContent);
                response.EnsureSuccessStatusCode();
                var ret = await response.Content.ReadAsStringAsync();

                return new GatewayResponse { Success = true, Response = ret };
            }
            catch (Exception ex)
            {
                return new GatewayResponse {Success = false, Response = ex.Message};
            }
        }
    }
}