using Microsoft.AspNetCore.Mvc;
using Restore.Data;
using Restore.Models;
using Restore_BE.Models.Contracts;
using Restore_BE.Models.DTOs;
using Restore_BE.Repositories.IRepositories;
using System.Net;

namespace Restore.Controllers
{
    [ApiController]
    [Route("[controller]")]

    public class ProductsController : Controller

    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly ICommonResponse _response;
        private readonly ILogger<ProductsController> _logger;

        public ProductsController(IUnitOfWork unitOfWork, ICommonResponse response, ILogger<ProductsController> logger)
        {
            _unitOfWork = unitOfWork;
            _response = response;
            _logger = logger;
        }


        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]

        public async Task<ActionResult<APIResponse>> GetAllProducts()
        {
            try
            {
                _logger.LogInformation("Gettig all products");

                var products = await _unitOfWork.Products.GetAllAsync();

                return Ok(_response.GetSuccessApiResponsse(products, HttpStatusCode.OK));

            }
            catch (Exception ex)
            {
                _logger.LogError($"error getting products , {ex.Message}");

                return StatusCode(500, _response.CatchBlockApiResponse(ex));
            }
        }


        [HttpGet("in-stock")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<APIResponse>> GetAllProductsInStock()
        {
            try
            {
                _logger.LogInformation("Gettig all products in stock");

                var products = await _unitOfWork.Products.GetProductsInStockAsync();

                return Ok(_response.GetSuccessApiResponsse(products, HttpStatusCode.OK));

            }
            catch (Exception ex)
            {
                _logger.LogError($"error getting products in stock, {ex.Message}");

                return StatusCode(500, _response.CatchBlockApiResponse(ex));
            }
        }


        [HttpGet("low-stock/{maxQuantity:int}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<APIResponse>> GetProductsWithLowStock(int maxQuantity)
        {
            try
            {
                _logger.LogInformation("Gettig products with low stock");

                var products = await _unitOfWork.Products.GetProductsWithLowStockAsync(maxQuantity);

                return Ok(_response.GetSuccessApiResponsse(products, HttpStatusCode.OK));

            }
            catch (Exception ex)
            {
                _logger.LogError($"error getting products with low stock, {ex.Message}");

                return StatusCode(500, _response.CatchBlockApiResponse(ex));
            }
        }


        [HttpGet("get-product/{id:int}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<APIResponse>> GetProductById(int id)
        {
            try
            {
                _logger.LogInformation("Gettig product by id");
                var product = await _unitOfWork.Products.GetAsync(id);
                if (product == null)
                {
                    _logger.LogWarning("Product not found");
                    return NotFound(_response.NotFoundApiResponse("Product"));
                }
                return Ok(_response.GetSuccessApiResponsse(product, HttpStatusCode.OK));
            }
            catch (Exception ex)
            {
                _logger.LogError($"error getting product by id, {ex.Message}");
                return StatusCode(500, _response.CatchBlockApiResponse(ex));
            }
        }


        [HttpPost("create-product")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<APIResponse>> CreateProduct(Product product)
        {
            try
            {
                _logger.LogInformation("Creating a new product");

                if (!ModelState.IsValid)
                {
                    _logger.LogWarning("Invalid product data");
                    return BadRequest(_response.BadRequestApiResponse());
                }
                await _unitOfWork.Products.CreateAsync(product);
                await _unitOfWork.SaveChangesAsync();

                return CreatedAtAction(nameof(GetProductById), new { id = product.Id }, _response.GetSuccessApiResponsse(product, HttpStatusCode.Created));
            }

            catch (Exception ex)
            {
                _logger.LogError($"error creating product, {ex.Message}");
                return StatusCode(500, _response.CatchBlockApiResponse(ex));
            }

        }

        [HttpDelete("delete-product/{id:int}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<APIResponse>> DeleteProduct(int id)
        {
            try
            {
                _logger.LogInformation("Deleting a product");
                var product = await _unitOfWork.Products.GetAsync(id);

                if (product == null)
                {
                    _logger.LogWarning("Product not found");
                    return NotFound(_response.NotFoundApiResponse("Product"));
                }

                _unitOfWork.Products.Delete(product);
                await _unitOfWork.SaveChangesAsync();
                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError($"error deleting product, {ex.Message}");
                return StatusCode(500, _response.CatchBlockApiResponse(ex));
            }
        }

        [HttpPut("update-product")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<APIResponse>> UpdateProduct(Product product)
        {
            try
            {
                _logger.LogInformation("Updating a product");

                if (!ModelState.IsValid)
                {
                    _logger.LogWarning("Invalid product data");
                    return BadRequest(_response.BadRequestApiResponse());
                }

                var existingProduct = await _unitOfWork.Products.GetAsync(product.Id);

                if (existingProduct == null)
                {
                    _logger.LogWarning("Product not found");
                    return NotFound(_response.NotFoundApiResponse("Product"));
                }

                _unitOfWork.Products.Update(product);
                await _unitOfWork.SaveChangesAsync();

                return Ok(_response.GetSuccessApiResponsse(product, HttpStatusCode.OK));
            }
            catch (Exception ex)
            {
                _logger.LogError($"error updating product, {ex.Message}");
                return StatusCode(500, _response.CatchBlockApiResponse(ex));
            }
        }
    }
}
