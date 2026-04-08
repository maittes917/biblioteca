using System;
using System.Linq;

class Program
{
    static void Main()
    {
        var lastMonth = DateTime.Now.AddMonths(-1);

        var pedidos = Data.Orders
            .Where(o => o.OrderDate >= lastMonth)
            .GroupBy(o => o.Status);

        Console.WriteLine("Pedidos por estado:");
        foreach (var g in pedidos)
            Console.WriteLine($"{g.Key}: {g.Count()}");

        var topLibros = Data.Books
            .GroupBy(b => b.Genre)
            .Select(g => new
            {
                Genero = g.Key,
                Libros = g.OrderByDescending(b => b.Sales).Take(5)
            });

        Console.WriteLine("\nTop libros:");
        foreach (var g in topLibros)
        {
            Console.WriteLine(g.Genero);
            foreach (var b in g.Libros)
                Console.WriteLine($"- {b.Title}");
        }

        var resultados = Data.Books
            .Where(b => b.Title.Contains("harry", StringComparison.OrdinalIgnoreCase));

        Console.WriteLine("\nBúsqueda:");
        foreach (var b in resultados)
            Console.WriteLine(b.Title);

        var topClientes = Data.Orders
            .GroupBy(o => o.CustomerId)
            .Select(g => new { Id = g.Key, Total = g.Sum(o => o.TotalAmount) })
            .OrderByDescending(x => x.Total)
            .Take(3);

        Console.WriteLine("\nTop clientes:");
        foreach (var c in topClientes)
            Console.WriteLine($"Cliente {c.Id}: {c.Total}");

        var sinCompletados = Data.Customers
            .Where(c => !Data.Orders.Any(o => o.CustomerId == c.Id && o.Status == "Completed"));

        Console.WriteLine("\nClientes sin pedidos completados:");
        foreach (var c in sinCompletados)
            Console.WriteLine(c.Name);
    }
}
