using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SportBin.Data;
using SportBin.Models.BM;
using SportBin.Models.DTO;
using SportBin.Services;

namespace SportBin.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AppointmentController : ControllerBase
    {
        private readonly AppointmentService _appointmentService;
        public AppointmentController(DataContext ctx, AppointmentService appointmentService)
        {
            _appointmentService = appointmentService;
        }


        [Authorize]
        [HttpGet("")]
        public async Task<ActionResult<List<AppointmentDTO>>> GetAllAppointments()
        {
            var result = await _appointmentService.GetAllAppointments();
            return Ok(result);
        }

        [HttpGet("dates")]
        public async Task<ActionResult<List<DateTime>>> GetAllDates()
        {
            return await _appointmentService.GetAllDates();
        }

        [Authorize]
        [HttpPost("approve")]
        public async Task<ActionResult<bool>> ApproveAppintment(AppointmentApproveBM model)
        {
            var result = await _appointmentService.ApproveAppointment(model.Id);
            return Ok(result);
        }

        [Authorize]
        [HttpPost("decline")]
        public async Task<ActionResult<bool>> DeclineAppintment(AppointmentApproveBM model)
        {
            var result = await _appointmentService.DeclineAppointment(model.Id);
            return Ok(result);
        }

        [HttpPost("")]
        public async Task<ActionResult<AppointmentDTO>> CreateAppointment(AppointmentBM model)
        {
            var result = await _appointmentService.CreateAppointment(model);
            return Ok(result);
        }

        [Authorize]
        [HttpDelete("{id}")]
        public async Task<ActionResult<bool>> DeleteAppointment([FromRoute] Guid id)
        {
            var result = await _appointmentService.DeleteAppointment(id);
            return Ok(result);
        }
    }
}