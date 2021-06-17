from django.db import models

# class BigTopic(models.Model):
#     id = models.BigAutoField(help_text="BigTopic ID", primary_key=True)
#     bigTopic = models.CharField(max_length=20, blank=False, null=False)
#
# class SmallTopic(models.Model):
#     id = models.BigAutoField(help_text="SmallTopic ID", primary_key=True)
#     smallTopic = models.ManyToManyField('BigTopic',blank=False)

class Question(models.Model):
    question_text = models.CharField(max_length=200)

    def __str__(self):
        return self.question_text

class Choice(models.Model):
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    choice_text = models.CharField(max_length=200)

    def __str__(self):
        return self.choice_text