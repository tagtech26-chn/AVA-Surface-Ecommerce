namespace AVASurface.Ecommerce.Domain;

public enum EcommerceOrderStatus
{
    PendingPayment = 0,
    Paid = 1,
    PaymentFailed = 2,
    Cancelled = 3
}

public sealed class EcommerceOrder
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public string OrderNumber { get; set; } = string.Empty;
    public string CustomerName { get; set; } = string.Empty;
    public string Phone { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string DeliveryAddress { get; set; } = string.Empty;
    public string City { get; set; } = string.Empty;
    public string Pincode { get; set; } = string.Empty;
    public decimal Subtotal { get; set; }
    public decimal Discount { get; set; }
    public decimal HandlingCharge { get; set; }
    public decimal TransportCharge { get; set; }
    public decimal Gst { get; set; }
    public decimal GrandTotal { get; set; }
    public EcommerceOrderStatus Status { get; set; } = EcommerceOrderStatus.PendingPayment;
    public string? PaymentReference { get; set; }
    public DateTime CreatedAtUtc { get; set; } = DateTime.UtcNow;
}
