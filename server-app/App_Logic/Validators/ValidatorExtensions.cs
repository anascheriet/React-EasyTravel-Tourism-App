using FluentValidation;

namespace server_app.App_Logic.Validators
{
    public static class ValidatorExtensions
    {
        public static IRuleBuilder<T, string> Rules<T>(this IRuleBuilder<T, string> ruleBuilder)
        {
            var options = ruleBuilder
            .NotEmpty()
            .MinimumLength(6).WithMessage("Password must be at least 6  characters")
            .Matches("[A-Z]").WithMessage("Password must contain 1 uppercase letter")
            .Matches("[A-Z]").WithMessage("Password must contain 1 lowercase letter")
            .Matches("[0-9]").WithMessage("Password must contain a number")
            .Matches("[^a-zA-Z0-9]").WithMessage("Password must contain a non alphanumeric");

            return options;
        }
    }
}