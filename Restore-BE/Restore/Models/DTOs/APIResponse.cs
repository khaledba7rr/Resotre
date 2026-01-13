using System.Net;

namespace Restore_BE.Models.DTOs
{
    public class APIResponse
    {
        public HttpStatusCode httpStatusCode { get; set; }
        public bool IsError { get; set; } = true;
        public bool IsSuccess => !IsError;
        public List<string>? Errors { get; set; }
        public Object? Result { get; set; }
    }
}
