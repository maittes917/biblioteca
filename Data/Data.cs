using System;
using System.Collections.Generic;

public static class Data
{
    public static List<Customer> Customers = new()
    {
        new Customer { Id = 1, Name = "Ana" },
        new Customer { Id = 2, Name = "Luis" },
        new Customer { Id = 3, Name = "Carlos" }
    };

    public static List<Order> Orders = new()
    {
        new Order { Id = 1, CustomerId = 1, OrderDate = DateTime.Now.AddDays(-10), Status = "Completed", TotalAmount = 100 },
        new Order { Id = 2, CustomerId = 1, OrderDate = DateTime.Now.AddDays(-40), Status = "Pending", TotalAmount = 50 },
        new Order { Id = 3, CustomerId = 2, OrderDate = DateTime.Now.AddDays(-5), Status = "Completed", TotalAmount = 200 }
    };

    public static List<Book> Books = new()
    {
        new Book { Id = 1, Title = "Harry Potter", Genre = "Fantasía", Sales = 500 },
        new Book { Id = 2, Title = "El Hobbit", Genre = "Fantasía", Sales = 300 },
        new Book { Id = 3, Title = "C# Básico", Genre = "Tecnología", Sales = 150 },
        new Book { Id = 4, Title = "LINQ Avanzado", Genre = "Tecnología", Sales = 200 }
    };
}