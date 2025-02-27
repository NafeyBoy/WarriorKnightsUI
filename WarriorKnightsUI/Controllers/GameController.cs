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

        public IActionResult RunGame(Guid gameId)
        {
            var model = new RunGameVM { GameId = gameId };
            return View(model);
        }
        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View("Error!");
        }

        [HttpPost]
        public async Task<JsonResult> CreateGame([FromBody] CreateGameVM vm)
        {
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

        [HttpPost]
        public async Task<JsonResult> LoadGame([FromBody] GameIdVM vm)
        {
            try
            {
                var response = await Gateway.Get(new GatewayRequest { Url = $"Game/{vm.GameId}" });
                return Json(response);
            }
            catch (Exception ex)
            {
                return Json(new { Success = false, Response = ex.Message });
            }
        }

        public async Task<JsonResult> GetTiles(Guid id)
        {
            try
            {
                var response = await Gateway.Get(new GatewayRequest { Url = $"Game/Board/{id}" });
                return Json(response);
            }
            catch (Exception ex)
            {
                return Json(new { Success = false, Response = ex.Message });
            }
        }

        [HttpPost]
        public async Task<JsonResult> GetTile([FromBody] GetTileVM vm)
        {
            try
            {
                var response = await Gateway.Post(new GatewayRequest { Url = $"Game/Tile", Body = vm });
                return Json(response);
            }
            catch (Exception ex)
            {
                return Json(new { Success = false, Response = ex.Message });
            }
        }

        public async Task<JsonResult> GetPlayers(Guid id)
        {
            try
            {
                var response = await Gateway.Get(new GatewayRequest { Url = $"Game/{id}" });
                return Json(response);
            }
            catch (Exception ex)
            {
                return Json(new { Success = false, Response = ex.Message });
            }
        }

        public async Task<JsonResult> GetPlayerMessage(Guid id)
        {
            try
            {
                var response = await Gateway.Get(new GatewayRequest { Url = $"Game/PlayerMessage/{id}" });
                return Json(response);
            }
            catch (Exception ex)
            {
                return Json(new { Success = false, Response = ex.Message });
            }
        }
        [HttpPost]
        public async Task<JsonResult> RespondToPlayerMessage([FromBody] PlayerMessageResponseVM vm)
        {
            try
            {
                var response = await Gateway.Put(new GatewayRequest { Url = $"Game/PlayerMessageResponse", Body = vm });
                return Json(response);
            }
            catch (Exception ex)
            {
                return Json(new { Success = false, Response = ex.Message });
            }
        }


    }
}