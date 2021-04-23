using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using PlanningPoker.Data.Entities;
using PlanningPoker.Data.Infrastructure;
using PlanningPoker.Web.ViewModels;
using System.Collections.Generic;
using System.Linq;

namespace PlanningPoker.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RoomController : ControllerBase
    {
        private readonly IRepository<User> userRepository;
        private readonly IRepository<Room> roomRepository;
        private readonly ILogger<RoomController> _logger;

        public RoomController(ILogger<RoomController> logger, IRepository<User> userRepository, IRepository<Room> roomRepository)
        {
            _logger = logger;
            this.userRepository = userRepository;
            this.roomRepository = roomRepository;
        }

        [HttpGet]
        public RoomViewModel Index(string id)
        {
            if (id is null) return null;

            var room = roomRepository.Find(id);
            if (room is null) return null;

            var users = new List<UserViewModel>();
            foreach (var userId in room.UserIds)
            {
                var user = userRepository.Find(userId);
                if (user is null) continue;
                users.Add(new UserViewModel { Id = userId, Username = user.Username, CardValue = user.CardValue });
            }
             
            return new RoomViewModel
            {
                Id = room.Id,
                Users = users,
                Name = room.Name,
                ShowResults = room.ShowResults
            }; 
        }
 
        [HttpPost("[action]")]
        public string Create(string userId, RoomViewModel room)
        {
            if (userId is null) return "<invalid userId>";

            var user = userRepository.Find(userId);
            if (user is null) return "<invalid userId>";

            return roomRepository.Add(new Room
            {
                ShowResults = false,
                UserIds = new string[] { user.Id },
                Name = string.IsNullOrEmpty(room.Name) ? "Random Room" : room.Name
            });
        }

        [HttpPost("[action]")]
        public IActionResult AddUser(string roomId, string userId)
        {
            if (roomId is null || userId is null) return BadRequest();

            var room = roomRepository.Find(roomId);
            if (room is null) return NotFound();

            if (room.UserIds.Contains(userId)) return Ok();

            var newUser = userRepository.Find(userId);
            if (newUser is null) return NotFound();

            room.UserIds = room.UserIds.Append(userId);
            roomRepository.Update(room);
            return Ok();
        }

        [HttpPost("[action]")]
        public IActionResult ToggleShowCards(string roomId, string userId)
        {
            if (roomId is null) return NotFound();

            var room = roomRepository.Find(roomId);
            if (room.UserIds is null || !room.UserIds.First().Equals(userId)) return Forbid("You are not the owner of room");

            room.ShowResults = true;
            roomRepository.Update(room);
            return Ok();
        }
    }
}
