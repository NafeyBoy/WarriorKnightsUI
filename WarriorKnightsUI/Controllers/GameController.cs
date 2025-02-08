using System.Text;
using System.Text.Json;
using Microsoft.AspNetCore.Mvc;
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
            try
            {
                var response = await Gateway.Post(new GatewayRequest { Url = "Game", Body = vm });
                return Json(response);
            }
            catch (Exception ex)
            {
                return Json(new { Success = false, Response = ex.Message });
            }
        }
    }
}