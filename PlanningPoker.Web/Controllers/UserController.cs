using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using PlanningPoker.Data.Entities;
using PlanningPoker.Data.Infrastructure;
using PlanningPoker.Web.ViewModels;

namespace PlanningPoker.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IRepository<User> userRepository;
        private readonly ILogger<RoomController> _logger;

        public UserController(ILogger<RoomController> logger, IRepository<User> userRepository)
        {
            _logger = logger;
            this.userRepository = userRepository;
        }

        [HttpGet]
        public UserViewModel Index(string id)
        {
            if (id is null) return null;

            var user = userRepository.Find(id);
            if (user is null) return null;

            return new UserViewModel
            {
                Id = user.Id,
                Username = user.Username,
                CardValue = user.CardValue
            };
        }

        [HttpPost("[action]")]
        public string Create(UserViewModel user)
        {
            return userRepository.Add(new User { Username = user.Username, CardValue = user.CardValue });
        }

        [HttpPost("[action]")]
        public IActionResult ChangeName(string id, string username)
        {
            if (id is null || username is null) return BadRequest();

            var user = userRepository.Find(id);
            if (user is null) return NotFound();

            user.Username = username;
            userRepository.Update(user);
            return Ok();
        }

        [HttpPost("[action]")]
        public IActionResult Vote(string userId, int cardValue)
        {
            var user = userRepository.Find(userId);
            if (user is null) return NotFound();

            //todo check if fibo
            user.CardValue = cardValue;
            userRepository.Update(user);
            return Ok();
        }
    }
}
