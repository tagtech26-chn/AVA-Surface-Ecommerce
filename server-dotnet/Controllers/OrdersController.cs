using AVASurface.Ecommerce.Domain;
using Microsoft.AspNetCore.Mvc;

namespace AVASurface.Ecommerce.Controllers;

[ApiController]
[Route("api/ecommerce/orders")]
public sealed class OrdersController : ControllerBase
{
    private static readonly Dictionary<Guid, EcommerceOrder> Orders = new();

    [HttpPost]
    public IActionResult Create([FromBody] EcommerceOrder order)
    {
        if (order.GrandTotal <= 0 || string.IsNullOrWhiteSpace(order.CustomerName) || string.IsNullOrWhiteSpace(order.Phone) || string.IsNullOrWhiteSpace(order.DeliveryAddress))
            return BadRequest(new { message = "Valid customer, delivery and order details are required." });

        order.Id = Guid.NewGuid();
        order.OrderNumber = $"AVA-{DateTime.UtcNow:yyyyMMdd}-{Random.Shared.Next(100000, 999999)}";
        order.Status = EcommerceOrderStatus.PendingPayment;
        order.CreatedAtUtc = DateTime.UtcNow;
        Orders[order.Id] = order;
        return Ok(order);
    }

    [HttpPost("{id:guid}/payment")]
    public IActionResult ConfirmPayment(Guid id, [FromBody] PaymentConfirmation request)
    {
        if (!Orders.TryGetValue(id, out var order)) return NotFound();
        if (string.IsNullOrWhiteSpace(request.PaymentReference)) return BadRequest(new { message = "Payment reference is required." });

        order.PaymentReference = request.PaymentReference.Trim();
        order.Status = EcommerceOrderStatus.Paid;
        return Ok(new { orderId = order.Id, orderNumber = order.OrderNumber, status = order.Status.ToString(), paymentReference = order.PaymentReference });
    }
}

public sealed record PaymentConfirmation(string PaymentReference);
