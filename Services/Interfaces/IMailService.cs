using Photography.Models.Helpers;

namespace Photography.Services.Interfaces
{
    public interface IMailService
    {
        Task<bool> SendMailAsync(MailData mailData);
        Task<bool> SendMailToMeAsync(MailData mailData);
    }
}
