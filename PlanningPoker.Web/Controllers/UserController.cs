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
  public class UserController : ControllerBase
  {
    private readonly IRepository<User> userRepository;
    private readonly IRepository<Room> roomRepository;
    private readonly ILogger<RoomController> _logger;

    public UserController(ILogger<RoomController> logger, IRepository<User> userRepository, IRepository<Room> roomRepository)
    {
      _logger = logger;
      this.userRepository = userRepository;
      this.roomRepository = roomRepository;
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

    [HttpGet("[action]")]
    public IList<RoomViewModel> GetRoomsForUser(string id)
    {
      return roomRepository
        .GetAll().Where(r => r.UserIds.Contains(id))
        .Select(r => new RoomViewModel
        {
          Id = r.Id,
          Name = r.Name,
        })
        .ToList();
    }
  }
}
