using Restore_BE.Models.DTOs;
using System.Net;

namespace Restore_BE.Models.Contracts
{
    public interface ICommonResponse
    {
        APIResponse GetSuccessApiResponsse(Object data, HttpStatusCode httpStatusCode);
        APIResponse NotFoundApiResponse(string modelName);
        APIResponse BadRequestApiResponse();
        APIResponse CustomErrorApiResponse(string error, HttpStatusCode code);
        APIResponse CatchBlockApiResponse(Exception exception);

    }
}
