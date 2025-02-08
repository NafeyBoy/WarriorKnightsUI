using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using WarriorKnightsUI.Models;

namespace WarriorKnightsUI.Controllers
{
    public class GameController : Controller
    {
        private readonly ILogger<GameController> _logger;

        public GameController(ILogger<GameController> logger)
        {
            _logger = logger;
        }

        public IActionResult NewGame()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View("Error!");
        }

        public IActionResult RunGame(Guid gameId)
        {
            //TODO - create a model containing info needed to create running game view, then create gateway action & message type to get that data and load it in. 
            return View();
        }

        [HttpPost]
        public async Task<JsonResult> CreateGame([FromBody]CreateGameVM vm){
            try{
                using StringContent jsonContent = new(
                    JsonSerializer.Serialize(vm),
                    Encoding.UTF8,
                    "application/json");

                using HttpResponseMessage response = await Gateway.Api.PostAsync("Game", jsonContent);
                response.EnsureSuccessStatusCode();
                var ret = await response.Content.ReadAsStringAsync();

                return Json(new { success = true, response = ret });
            }
            catch(Exception ex){
                return Json(new {success = false, response = ""});
            }
        }
    }
}