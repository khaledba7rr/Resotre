using Restore_BE.Models.Contracts;
using Restore_BE.Models.DTOs;
using System;
using System.Net;

namespace Restore_BE.Services
{
    public class CommonResponse : ICommonResponse
    {
        public APIResponse BadRequestApiResponse()
        {
            return new APIResponse
            {
                Errors = new List<string>() { "Bad Request" },
                httpStatusCode = HttpStatusCode.BadRequest,
                IsError = true,
                Result = null
            };
        }

        public APIResponse CatchBlockApiResponse(Exception exception)
        {
            return new APIResponse
            {
                Errors = new List<string>() { exception.Message },
                httpStatusCode = HttpStatusCode.InternalServerError,
                IsError = true,
                Result = null
            };
        }

        public APIResponse CustomErrorApiResponse(string error, HttpStatusCode code)
        {
            return new APIResponse
            {
                Errors = new List<string>() { error },
                httpStatusCode = code,
                IsError = true,
                Result = null
            };
        }

        public APIResponse GetSuccessApiResponsse(Object data, HttpStatusCode httpStatusCode)
        {
            return new APIResponse
            {
                Errors = new List<string>(),
                httpStatusCode = httpStatusCode,
                IsError = false,
                Result = data
            };
        }

        public APIResponse NotFoundApiResponse(string modelName)
        {
            return new APIResponse
            {
                Errors = new List<string>() { $"Cannot find {modelName}" },
                httpStatusCode = HttpStatusCode.NotFound,
                IsError = true,
                Result = null
            };
        }
    }
}
