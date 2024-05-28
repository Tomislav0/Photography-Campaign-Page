
using Mapster;
using Microsoft.EntityFrameworkCore;
using Photography.Models.Helpers;
using Photography.Services;
using Photography.Services.Interfaces;
using SportBin.Data;
using SportBin.Models.BM;
using SportBin.Models.Definitions;
using SportBin.Models.DTO;

namespace SportBin.Services
{
    public class AppointmentService : BaseService
    {
        private readonly IMailService mailService;
        public AppointmentService(DataContext ctx, IMailService mailService) : base(ctx)
        {
            this.mailService = mailService;
        }
        public async Task<List<Appointment>> GetAllAppointments()
        {
            return await _ctx.Appointment.OrderByDescending(a =>a. CreatedAt).ToListAsync();
        }

        public async Task<List<DateTime>> GetAllDates()
        {
            return await _ctx.Appointment.OrderByDescending(a => a.CreatedAt).Select(s=>s.Date).ToListAsync();
        }

        public async Task<Appointment> CreateAppointment(AppointmentBM model)
        {

            var appointment = new Appointment() { Name = model.Name, Date = model.Date, Description = model.Description, Email = model.Email, PhoneNumber = model.PhoneNumber };

            await _ctx.Appointment.AddAsync(appointment);

            await _ctx.SaveChangesAsync();

            var data = new MailData()
            {
                EmailSubject = "Besplatna fotografija - Nova prijava",
                EmailBody = "Primio si novi zahtjev za rezervaciju termina  \n" +
                "Info\n" +
                $"Ime: {model.Name}  \n" +
                $"Email: {model.Email}  \n" +
                $"Mobitel: {model.PhoneNumber}  \n" +
                $"Datum: {model.Date.ToString("dd.MM.yyyy.")}  \n" +
                $"Opis: {model.Description}  \n"
            };
            mailService.SendMailToMeAsync(data);
            var dataToRequester = new MailData()
            {
                EmailToId = model.Email,
                EmailToName = model.Name,
                EmailSubject = "Zaprimljena prijava - Besplatno fotografiranje",
                EmailBody = $"Pozdrav {model.Name},\n\n" +
                $"tvoj zahtjev za rezervaciju termina je uspješno zaprimnjen.\n" +
                $"Hvala na prijavi, javit ću se u najkraćem mogućem roku.\n" +
                $"\n" +
                $"Lijep pozdrav,\n" +
                $"Tomislav Kovačević"
            };
            mailService.SendMailAsync(dataToRequester);

            return appointment.Adapt<Appointment>();
        }

        public async Task<bool> ApproveAppointment(Guid id)
        {
            var appointment = await _ctx.Appointment.FirstOrDefaultAsync(x => x.Id == id);
            if (appointment != null)
            {
                appointment.IsApproved = true;
                await _ctx.SaveChangesAsync();

                return true;
            }

            return false;
        }

        public async Task<bool> DeclineAppointment(Guid id)
        {
            var appointment = await _ctx.Appointment.FirstOrDefaultAsync(x => x.Id == id);
            if (appointment != null)
            {
                appointment.IsApproved = false;
                await _ctx.SaveChangesAsync();

                return true;
            }

            return false;
        }

        public async Task<bool> DeleteAppointment(Guid id)
        {
            var appointment = await _ctx.Appointment.Where(x => x.Id == id).ExecuteDeleteAsync();

            return false;
        }
    }
}
