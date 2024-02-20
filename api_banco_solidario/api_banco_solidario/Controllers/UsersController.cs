using api_banco_solidario.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using System.Data;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace api_banco_solidario.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : Controller
    {
        private IConfiguration _configuration;

        public UsersController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]
        [Route("GetUsers")]

        public JsonResult GetUsers()
        {
            string query = "select * from users";
            DataTable table = new DataTable();
            string sqlDatasource = _configuration.GetConnectionString("DefaultConnection");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDatasource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult(table);
        }

        [HttpGet]
        [Route("GetUsersLastId")]
        public JsonResult GetUsersLastId()
        {
            string query = "SELECT TOP 1 * FROM users ORDER BY id_user DESC";
            DataTable table = new DataTable();
            string sqlDatasource = _configuration.GetConnectionString("DefaultConnection");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDatasource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult(table);
        }

        [HttpPost]
        [Route("GetUser")]

        public dynamic GetUser([FromBody] Object optData)
        {
            var data = JsonConvert.DeserializeObject<dynamic>(optData.ToString());
            string id = data.id.ToString();
            string query = "select * from users where id_user=@id";
            DataTable table = new DataTable();
            string sqlDatasource = _configuration.GetConnectionString("DefaultConnection");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDatasource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@id", id);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                    if (table.Rows.Count > 0)
                    {
                        return new
                        {
                            success = true,
                            message = "User Found Successfully",
                            result = table
                        };
                    }
                    else
                    {
                        return new
                        {
                            success = false,
                            message = "User not found",
                            result = ""
                        };

                    }
                }
            }
        }

        [HttpPut]
        [Route("UpdateUser")]

        public dynamic UpdateUser([FromBody] Object optData)
        {
            var data = JsonConvert.DeserializeObject<dynamic>(optData.ToString());
            string id = data.id.ToString();
            string name = data.name.ToString();
            string query = "update users set name = @name  where id_user=@id";
            DataTable table = new DataTable();
            string sqlDatasource = _configuration.GetConnectionString("DefaultConnection");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDatasource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@name", name);
                    myCommand.Parameters.AddWithValue("@id", id);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();               
                    return new
                        {
                            success = false,
                            message = "Updated Successfully"
                        };
                }
            }
        }

        [HttpPost]
        [Route("AddUser")]

        public dynamic AddUser([FromBody] Object optData)
        {
            var data = JsonConvert.DeserializeObject<dynamic>(optData.ToString());
            string newCardId = data.card_id.ToString();
            string newName = data.name.ToString();
            string newLastname = data.lastname.ToString();
            string newEmail = data.email.ToString();
            string newPassword = data.password.ToString();
            string newCreated = data.created.ToString();
            string query = "insert into users values (@newCardId, @newName, @newLastname, @newEmail, @newPassword,@newCreated)";

            DataTable table = new DataTable();
            string sqlDatasource = _configuration.GetConnectionString("DefaultConnection");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDatasource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                    {
                        myCommand.Parameters.AddWithValue("@newCardId", newCardId);
                        myCommand.Parameters.AddWithValue("@newName", newName);
                        myCommand.Parameters.AddWithValue("@newLastname", newLastname);
                        myCommand.Parameters.AddWithValue("@newEmail", newEmail);
                        myCommand.Parameters.AddWithValue("@newPassword", newPassword);
                        myCommand.Parameters.AddWithValue("@newCreated", newCreated);
                        myReader = myCommand.ExecuteReader();
                        table.Load(myReader);
                        myReader.Close();
                        myCon.Close();
                            return new
                            {
                                success = true,
                                message = "User Created",
                            };
                }

            }
        }

        [HttpPost]
        [Route("Login")]

        public dynamic Login([FromBody] Object optData)
        {
            var data = JsonConvert.DeserializeObject<dynamic>(optData.ToString());
            string email= data.email.ToString();
            string password= data.password.ToString();
            string query = "SELECT * FROM users  INNER JOIN accounts ON users.id_user = accounts.id_user  WHERE email=@email AND password=@password";
            DataTable table = new DataTable();
            string sqlDatasource = _configuration.GetConnectionString("DefaultConnection");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDatasource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@email", email);
                    myCommand.Parameters.AddWithValue("@password", password);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                    if (table.Rows.Count > 0)
                    {
                        var jwt = _configuration.GetSection("Jwt").Get<Jwt>();
                        var claims = new[]
                        {
                            new Claim(JwtRegisteredClaimNames.Sub, jwt.Subject),
                            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                            new Claim(JwtRegisteredClaimNames.Iat, DateTime.UtcNow.ToString()),
                        };

                        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwt.Key));
                        var signIn = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

                        var token = new JwtSecurityToken(
                                jwt.Issuer,
                                jwt.Audience,
                                claims,
                                expires: DateTime.Now.AddMinutes(4),
                                signingCredentials: signIn
                                );
                        return new
                        {
                            success = true,
                            message = "Login Successfully",
                            token = new JwtSecurityTokenHandler().WriteToken(token),
                            data = table
                        };
                    }
                    else
                    {
                        return new
                        {
                            success = false,
                            message = "Login Falied",
                            result = ""
                        };
                        
                    }


                }

            }
        }

        [HttpPost]
        [Route("DeleteUser")]

        public dynamic DeleteUser([FromBody] Object optData)
        {
            var data = JsonConvert.DeserializeObject<dynamic>(optData.ToString());
            string id = data.id.ToString();
            string query = "delete from users where id_user=@id";
            DataTable table = new DataTable();
            string sqlDatasource = _configuration.GetConnectionString("DefaultConnection");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDatasource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@id", id);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                    return new
                    {
                        success = false,
                        message = "Deleted Successfully"
                    };
                }
            }
        }
    }
}
